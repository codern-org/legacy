import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  GetAllWorkspacesRequest, GetAllWorkspacesResponse, GetQuestionByIdRequest,
  GetQuestionByIdResponse, GetQuestionsByWorkspaceIdRequest,
  GetQuestionsByWorkspaceIdResponse, GetWorkspaceByIdRequest, GetWorkspaceByIdResponse,
} from 'api-types';
import { WorkspaceService } from '@/services/WorkspaceService';

@Controller('/workspace')
export class WorkspaceController {

  private readonly workspaceService: WorkspaceService;

  public constructor(workspaceService: WorkspaceService) {
    this.workspaceService = workspaceService;
  }

  @GrpcMethod('WorkspaceService')
  public async getAllWorkspaces(data: GetAllWorkspacesRequest): Promise<GetAllWorkspacesResponse> {
    const workspaces = await this.workspaceService.getAllWorkspaces(data.userId);
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
    return { questions };
  }

  @GrpcMethod('WorkspaceService')
  public async getQuestionById(data: GetQuestionByIdRequest): Promise<GetQuestionByIdResponse> {
    const question = await this.workspaceService.getQuestionByIdOrThrow(data.id);
    return { question };
  }

}
