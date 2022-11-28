import { Injectable } from '@nestjs/common';
import {
  ExpectedNotFoundError, GradeResponse, Language,
  SubmitResponse,
} from 'api-types';
import { SubmissionStatus } from '@prisma/client';
import { SubmissionRepository } from '@/repositories/SubmissionRepository';
import { QueueSerivce } from '@/services/QueueService';
import { TestcaseRepository } from '@/repositories/TestcaseRepository';
import { GradingError } from '@/utils/errors/GradingError';

@Injectable()
export class GradingService {

  private readonly queueService: QueueSerivce;
  private readonly submissionRepository: SubmissionRepository;
  private readonly testcaseRepository: TestcaseRepository;

  public constructor(
    queueService: QueueSerivce,
    submissionRepository: SubmissionRepository,
    testcaseRepository: TestcaseRepository,
  ) {
    this.queueService = queueService;
    this.submissionRepository = submissionRepository;
    this.testcaseRepository = testcaseRepository;
  }

  public async submit(
    userId: string,
    questionId: number,
    language: Language,
  ): Promise<SubmitResponse> {
    const testcase = await this.testcaseRepository.getTestcaseByQuestionId(questionId);
    if (!testcase) throw new ExpectedNotFoundError(GradingError.TestcaseNotFound);

    const uploadedAt = new Date();
    const filePath = `/${userId}/${questionId}/${language}/${uploadedAt.getTime()}`;

    const submission = await this.submissionRepository.createSubmission({
      userId,
      questionId,
      language,
      status: SubmissionStatus.UPLOADING,
      filePath,
      uploadedAt: new Date(),
    });

    return {
      submissionId: submission.id,
      filePath,
    };
  }

  public async grade(submissionId: number): Promise<GradeResponse> {
    const submission = await this.submissionRepository.updateSubmission(submissionId, {
      status: SubmissionStatus.GRADING,
    });

    const testcase = await this.testcaseRepository.getTestcaseByQuestionId(submission.questionId);
    if (!testcase) throw new ExpectedNotFoundError(GradingError.TestcaseNotFound);

    this.queueService.grade(
      submission.id,
      submission.language as Language,
      testcase.filePath,
    );

    return {
      submissionId,
      questionId: submission.questionId,
      language: submission.language as Language,
      filePath: submission.filePath,
    };
  }

}
