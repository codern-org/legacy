import { Injectable } from '@nestjs/common';
import {
  ExpectedNotFoundError, SubmitResponse, Language,
  QuestionSummary, QuestionStatus, ExpectedInvalidError,
  ResultStatus, SubmissionWithResults, Result,
  ResultMetadata,
} from '@codern/internal';
import { Timestamp } from '@codern/shared';
import { Submission } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { SubmissionRepository } from '@/repositories/SubmissionRepository';
import { GradingFile, QueueSerivce } from '@/services/QueueService';
import { TestcaseRepository } from '@/repositories/TestcaseRepository';
import { GradingError } from '@/utils/errors/GradingError';
import { ResultRepository } from '@/repositories/ResultRepository';

type SubmissionWithQuestionStatus = Submission & { questionStatus: QuestionStatus };
type QuestionStatusWeightMap = { [status in QuestionStatus]: number };

@Injectable()
export class GradingService {

  private readonly configService: ConfigService;
  private readonly httpService: HttpService;
  private readonly queueService: QueueSerivce;
  private readonly submissionRepository: SubmissionRepository;
  private readonly testcaseRepository: TestcaseRepository;
  private readonly resultRepository: ResultRepository;

  public constructor(
    configService: ConfigService,
    httpService: HttpService,
    queueService: QueueSerivce,
    submissionRepository: SubmissionRepository,
    testcaseRepository: TestcaseRepository,
    resultRepository: ResultRepository,
  ) {
    this.configService = configService;
    this.httpService = httpService;
    this.queueService = queueService;
    this.submissionRepository = submissionRepository;
    this.testcaseRepository = testcaseRepository;
    this.resultRepository = resultRepository;
  }

  public async submit(
    userId: string,
    questionId: number,
    language: Language,
  ): Promise<SubmitResponse> {
    const testcases = await this.testcaseRepository.getTestcasesByQuestionId(questionId);
    if (testcases.length === 0) throw new ExpectedNotFoundError(GradingError.TestcaseNotFound);

    const uploadedAt = Timestamp.now();
    const filePath = `/submissions/${userId}/${questionId}/${language}/${uploadedAt}`;

    const { id: submissionId } = await this.submissionRepository.createSubmission({
      userId,
      question: { connect: { id: questionId } },
      language,
      filePath,
      uploadedAt,
    });

    return { submissionId, filePath };
  }

  public async grade(submissionId: number): Promise<SubmissionWithResults> {
    const submission = await this.submissionRepository.getSubmissionWithQuestionById(submissionId);
    if (!submission) throw new ExpectedInvalidError(GradingError.InvalidSubmission);

    const testcases = await this.testcaseRepository.getTestcasesByQuestionId(submission.questionId);
    if (testcases.length === 0) throw new ExpectedNotFoundError(GradingError.TestcaseNotFound);

    const filerUrl = this.configService.get('publicFilerUrl');
    const { question } = submission;
    const testcaseIds = testcases.map((testcase) => testcase.id);

    const resultsWithTestcase = await this.resultRepository
      .createResultsAndReturnWithTestcase(submissionId, testcaseIds);

    const results = resultsWithTestcase.map((result) => {
      const submissionFile: GradingFile = {
        name: 'source',
        sourceType: 'URL',
        source: `${filerUrl}${submission.filePath}`,
      };
      const testcaseFile: GradingFile = {
        name: 'testcase.zip',
        sourceType: 'URL',
        source: `${filerUrl}${result.testcase.filePath}`,
      };
      const files: GradingFile[] = [submissionFile, testcaseFile];

      this.queueService.grade(
        result.id,
        submission.language as Language,
        question.memoryLimit,
        question.timeLimit,
        files,
      );

      return {
        id: result.id,
        submissionId: result.submissionId,
        testcaseId: result.testcaseId,
        status: result.status,
      };
    });

    return {
      id: submissionId,
      userId: submission.userId,
      questionId: submission.questionId,
      language: submission.language as Language,
      filePath: submission.filePath,
      results: results as Result[],
      uploadedAt: submission.uploadedAt,
    };
  }

  public async result(
    resultId: number,
    status: ResultStatus,
    metadata: ResultMetadata,
  ): Promise<void> {
    const targetResult = await this.resultRepository.getResultById(resultId);
    if (!targetResult) throw new ExpectedInvalidError(GradingError.InvalidResult);
    const { submissionId } = targetResult;

    await this.resultRepository.updateResult(resultId, {
      status,
      memoryUsage: metadata.memory,
      timeUsage: metadata.containerTime,
      compilationLog: metadata.compilationLog,
    });

    const submission = await this.submissionRepository.getSubmissionWithRessultsById(submissionId);
    if (!submission) throw new ExpectedInvalidError(GradingError.InvalidSubmission);

    // TODO: Investigate why localhost not working instead of 127.0.0.1
    // TODO: add type
    const gatewayRawUrl = this.configService.get('gatewayRawUrl');
    await this.httpService.axiosRef.request({
      url: `${gatewayRawUrl}/socket/submission/${submissionId}`,
      method: 'POST',
      data: {
        userId: submission.userId,
        submissionId: submission.id,
        filePath: submission.filePath,
        language: submission.language,
        results: submission.results,
        uploadedAt: submission.uploadedAt,
      },
    });
  }

  public async getQuestionSummaryByIds(ids: number[], userId?: string): Promise<QuestionSummary[]> {
    const submissions = await this.submissionRepository
      .getSubmissionWithResultsByQuestionIds(ids, userId);

    const lastSubmissions = this.filterLastSubmissions(submissions);
    const analyzedSubmissions = this.analyzeSubmissions(submissions as SubmissionWithResults[]);

    return lastSubmissions.map((lastSubmission) => {
      const submission = analyzedSubmissions
        .find((data) => data.questionId === lastSubmission.questionId);
      return {
        questionId: lastSubmission.questionId,
        uploadedAt: lastSubmission.uploadedAt,
        status: submission ? submission.questionStatus : QuestionStatus.TODO,
      };
    });
  }

  public filterLastSubmissions(submissions: Submission[]): Submission[] {
    return submissions
      .sort((x, y) => y.uploadedAt - x.uploadedAt)
      .reduce((selecteds, submission) => {
        const isAlreadySelected = selecteds
          .some((selected) => selected.questionId === submission.questionId);
        if (!isAlreadySelected) selecteds.push(submission);
        return selecteds;
      }, [] as Submission[]);
  }

  public analyzeSubmissions(submissions: SubmissionWithResults[]): SubmissionWithQuestionStatus[] {
    // Summarize result statuses to question status
    const submissionsWithQuestionStatus = submissions.map((submission) => {
      const { results } = submission;
      let questionStatus = QuestionStatus.TODO;
      if (submission.results.length === 0) {
        questionStatus = QuestionStatus.ERROR;
      } else {
        const isPassed = results.every((result) => result.status === ResultStatus.PASSED);
        const isGrading = results.some((result) => result.status === ResultStatus.GRADING);
        if (!isGrading) questionStatus = (isPassed ? QuestionStatus.DONE : QuestionStatus.ERROR);
      }
      return { ...submission, questionStatus };
    });

    // Filter the best submission of question id, prioritize by `uploadedAt` and `status`

    const groupedSubmissionByQuestionId = submissionsWithQuestionStatus
      .reduce((acc, submission) => {
        const { questionId } = submission;
        acc[questionId] = acc[questionId] ?? [];
        acc[questionId].push(submission);
        return acc;
      }, [] as SubmissionWithQuestionStatus[][]);

    const statusToWeight: QuestionStatusWeightMap = {
      [QuestionStatus.DONE]: 2,
      [QuestionStatus.ERROR]: 1,
      [QuestionStatus.TODO]: 0,
    };
    // Pre reverse weight map for O(n) -> O(1)
    const weightToStatus: { [weight: number]: string } = {};
    Object.keys(statusToWeight).forEach((key) => {
      weightToStatus[statusToWeight[key as keyof QuestionStatusWeightMap]] = key;
    });

    const prioritizedSubmissions = groupedSubmissionByQuestionId
      .map((groupedSubmission) => groupedSubmission.map((submission) => {
        const questionStatus = statusToWeight[submission.questionStatus];
        return { ...submission, questionStatus };
      }))
      .map((groupedSubmission) => groupedSubmission.sort((x, y) => {
        const uploadedAtComparator = (x.uploadedAt - y.uploadedAt);
        const statusComparator = (y.questionStatus - x.questionStatus);
        return (statusComparator || uploadedAtComparator);
      }))
      .map((groupedSubmission) => groupedSubmission[0])
      .map((submission) => ({
        ...submission,
        questionStatus: weightToStatus[submission.questionStatus] as QuestionStatus,
      }))
      .filter(Boolean); // Clear empty element from submission grouping by question id

    return prioritizedSubmissions;
  }

  public getSubmissionsByQuestionId(id: number, userId?: string): Promise<SubmissionWithResults[]> {
    return this.submissionRepository
      .getSubmissionsWithResultsByQuestionId(id, userId) as Promise<SubmissionWithResults[]>;
  }

}
