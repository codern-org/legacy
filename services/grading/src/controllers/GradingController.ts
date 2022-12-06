import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  GetQuestionSummaryByIdRequest,
  GetQuestionSummaryByIdResponse,
  GradeRequest, GradeResponse, SubmitRequest,
  SubmitResponse,
} from '@codern/internal';
import { GradingService } from '@/services/GradingService';

@Controller('/grade')
export class GradingController {

  private readonly gradingService: GradingService;

  public constructor(gradingService: GradingService) {
    this.gradingService = gradingService;
  }

  @GrpcMethod('GradingService')
  public async submit(data: SubmitRequest): Promise<SubmitResponse> {
    const { userId, questionId, language } = data;
    return this.gradingService.submit(userId, questionId, language);
  }

  @GrpcMethod('GradingService')
  public async grade(data: GradeRequest): Promise<GradeResponse> {
    return this.gradingService.grade(data.submissionId);
  }

  @GrpcMethod('GradingService')
  public async getQuestionSummaryByIds(
    data: GetQuestionSummaryByIdRequest,
  ): Promise<GetQuestionSummaryByIdResponse> {
    const { questionIds } = data;
    const questionSummaries = await this.gradingService.getQuestionSummaryByIds(questionIds);
    return { questionSummaries };
  }

}
