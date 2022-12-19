import { Injectable } from '@nestjs/common';
import {
  ExpectedNotFoundError, GradeResponse, SubmitResponse,
  Language, QuestionSummary, QuestionStatus, TestcaseStatus, GradingStatus,
} from '@codern/internal';
import { Timestamp } from '@codern/shared';
import { Submission } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { SubmissionRepository } from '@/repositories/SubmissionRepository';
import { FileSource, QueueSerivce } from '@/services/QueueService';
import { TestcaseRepository } from '@/repositories/TestcaseRepository';
import { GradingError } from '@/utils/errors/GradingError';
import { QuestionRepository } from '@/repositories/QuestionRepository';

type QuestionIdWithStatus = Pick<Submission, 'questionId'> & { status: QuestionStatus };

@Injectable()
export class GradingService {

  private readonly configService: ConfigService;
  private readonly queueService: QueueSerivce;
  private readonly submissionRepository: SubmissionRepository;
  private readonly testcaseRepository: TestcaseRepository;
  private readonly questionRepository: QuestionRepository;

  public constructor(
    configService: ConfigService,
    queueService: QueueSerivce,
    submissionRepository: SubmissionRepository,
    testcaseRepository: TestcaseRepository,
    questionRepository: QuestionRepository,
  ) {
    this.configService = configService;
    this.queueService = queueService;
    this.submissionRepository = submissionRepository;
    this.testcaseRepository = testcaseRepository;
    this.questionRepository = questionRepository;
  }

  public async submit(
    userId: string,
    questionId: number,
    language: Language,
  ): Promise<SubmitResponse> {
    const testcase = await this.testcaseRepository.getTestcaseByQuestionId(questionId);
    if (!testcase) throw new ExpectedNotFoundError(GradingError.TestcaseNotFound);

    const uploadedAt = Timestamp.now();
    const filePath = `/${userId}/${questionId}/${language}/${uploadedAt}`;

    const submission = await this.submissionRepository.createSubmission({
      userId,
      questionId,
      language,
      status: GradingStatus.UPLOADING,
      filePath,
      uploadedAt,
    });

    return {
      submissionId: submission.id,
      filePath,
    };
  }

  public async grade(submissionId: number): Promise<GradeResponse> {
    const submission = await this.submissionRepository.updateSubmission(submissionId, {
      status: GradingStatus.GRADING,
    });

    const testcase = await this.testcaseRepository.getTestcaseByQuestionId(submission.questionId);
    if (!testcase) throw new ExpectedNotFoundError(GradingError.TestcaseNotFound);

    const question = await this.questionRepository.getQuestionByQuestionId(submission.questionId);
    if (!question) throw new ExpectedNotFoundError(GradingError.QuestionNotFound);

    const filerUrl = this.configService.get('publicFilerUrl');
    const sourceUrl = `${filerUrl}${submission.filePath}`;

    const filesSource: FileSource[] = [{
      name: 'source',
      sourceType: 'URL',
      source: sourceUrl,
    }];

    this.queueService.grade(
      submission.id,
      submission.language as Language,
      question.memoryLimit,
      question.timeLimit,
      filesSource,
    );

    return {
      submissionId,
      questionId: submission.questionId,
      language: submission.language as Language,
      filePath: submission.filePath,
    };
  }

  public async result(submissionId: number, result: string): Promise<void> {
    await this.submissionRepository.updateSubmission(submissionId, {
      status: GradingStatus.COMPLETED,
      result,
    });
  }

  public async getQuestionSummaryByIds(ids: number[]): Promise<QuestionSummary[]> {
    const submissions = await this.submissionRepository.getSubmissionByQuestionIds(ids);
    const lastSubmissions = this.filterLastSubmission(submissions);
    const questionsStatus = this.getQuestionStatus(submissions);

    return lastSubmissions.map((submission) => {
      const questionStatus = questionsStatus
        .find((data) => data.questionId === submission.questionId);
      return {
        questionId: submission.questionId,
        uploadedAt: submission.uploadedAt,
        status: questionStatus ? questionStatus.status : QuestionStatus.TODO,
      };
    });
  }

  public filterLastSubmission(submissions: Submission[]): Submission[] {
    return submissions
      .sort((x, y) => y.uploadedAt - x.uploadedAt)
      .reduce((selecteds, submission) => {
        const isAlreadySelected = selecteds
          .some((selected) => selected.questionId === submission.questionId);
        if (!isAlreadySelected) selecteds.push(submission);
        return selecteds;
      }, [] as Submission[]);
  }

  public getQuestionStatus(submissions: Submission[]): QuestionIdWithStatus[] {
    const submissionsGroupByQuestionId = submissions.reduce((acc, value) => {
      const { questionId, result } = value;
      const group = acc.find((submission) => submission.questionId === value.questionId);
      if (group && result) {
        group.results.push(result);
      } else if (!group) {
        acc.push({ questionId, results: (result ? [result] : []) });
      }
      return acc;
    }, [] as Pick<Submission & { results: string[] }, 'questionId' | 'results'>[]);

    const submissionsStatus = submissionsGroupByQuestionId.map((submission) => {
      const { results, questionId } = submission;
      const isContainsPassResult = results.some((result) => (Number.parseInt(result, 10) === 0));
      let status = QuestionStatus.ERROR;
      if (results.length === 0) {
        status = QuestionStatus.TODO;
      } else if (isContainsPassResult) {
        status = QuestionStatus.DONE;
      }
      return { questionId, status };
    });

    return submissionsStatus;
  }

  public getTestcaseStatus(submissionResult: string): TestcaseStatus[] {
    return [...submissionResult]
      .map((result) => Object.values(TestcaseStatus)[Number.parseInt(result, 10)]);
  }

  public getSubmissionsByQuestionId(id: number): Promise<Submission[]> {
    return this.submissionRepository.getSubmissionsByQuestionId(id);
  }

}
