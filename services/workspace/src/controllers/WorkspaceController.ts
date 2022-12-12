import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  GetAllWorkspacesByUserIdRequest, GetAllWorkspacesByUserIdResponse, GetQuestionByIdRequest,
  GetQuestionByIdResponse, GetQuestionsByWorkspaceIdRequest, GetQuestionsByWorkspaceIdResponse,
  GetWorkspaceByIdRequest, GetWorkspaceByIdResponse, ValidateUserInWorkspaceRequest,
  ValidateQuestionInWorkspaceRequest,
  Question,
} from '@codern/internal';
import { WorkspaceService } from '@/services/WorkspaceService';

@Controller('/workspace')
export class WorkspaceController {

  private readonly workspaceService: WorkspaceService;

  public constructor(workspaceService: WorkspaceService) {
    this.workspaceService = workspaceService;
  }

  @GrpcMethod('WorkspaceService')
  public async validateUserInWorkspace(data: ValidateUserInWorkspaceRequest): Promise<void> {
    const { userId, workspaceId } = data;
    await this.workspaceService.validateUserInWorkspace(userId, workspaceId);
  }

  @GrpcMethod('WorkspaceService')
  public async validateQuestionInWorkspace(
    data: ValidateQuestionInWorkspaceRequest,
  ): Promise<void> {
    const { questionId, workspaceId } = data;
    await this.workspaceService.validateQuestionInWorkspace(questionId, workspaceId);
  }

  @GrpcMethod('WorkspaceService')
  public async getAllWorkspacesByUserId(
    data: GetAllWorkspacesByUserIdRequest,
  ): Promise<GetAllWorkspacesByUserIdResponse> {
    const workspaces = await this.workspaceService.getAllWorkspacesByUserId(data.userId);
    return { workspaces };
  }

  @GrpcMethod('WorkspaceService')
  public async getWorkspaceById(data: GetWorkspaceByIdRequest): Promise<GetWorkspaceByIdResponse> {
    const workspace = await this.workspaceService.getWorkspaceByIdOrThrow(data.workspaceId);
    return { workspace };
  }

  @GrpcMethod('WorkspaceService')
  public async getQuestionsByWorkspaceId(
    data: GetQuestionsByWorkspaceIdRequest,
  ): Promise<GetQuestionsByWorkspaceIdResponse> {
    const questions = await this.workspaceService.getQuestionsByWorkspaceId(data.id);
    return { questions: questions as Question[] };
  }

  @GrpcMethod('WorkspaceService')
  public async getQuestionById(data: GetQuestionByIdRequest): Promise<GetQuestionByIdResponse> {
    const question = await this.workspaceService.getQuestionByIdOrThrow(data.id);
    return { question: question as Question };
  }

}
