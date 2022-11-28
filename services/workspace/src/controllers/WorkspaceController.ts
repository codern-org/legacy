import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  GetAllWorkspacesByUserIdRequest, GetAllWorkspacesByUserIdResponse, GetQuestionByIdRequest,
  GetQuestionByIdResponse, GetQuestionsByWorkspaceIdRequest,
  GetQuestionsByWorkspaceIdResponse, GetWorkspaceByIdRequest, GetWorkspaceByIdResponse,
  ValidateUserInWorkspaceRequest, ValidateQuestionInWorkspaceRequest,
} from 'api-types';
import { from, map, Observable } from 'rxjs';
import { WorkspaceService } from '@/services/WorkspaceService';
import { convertDateToNumber } from '@/utils/Utils';

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
  public getAllWorkspacesByUserId(
    data: GetAllWorkspacesByUserIdRequest,
  ): Observable<GetAllWorkspacesByUserIdResponse> {
    return from(this.workspaceService.getAllWorkspacesByUserId(data.userId))
      .pipe(map((workspaces) => ({ workspaces: convertDateToNumber(workspaces) })));
  }

  @GrpcMethod('WorkspaceService')
  public getWorkspaceById(data: GetWorkspaceByIdRequest): Observable<GetWorkspaceByIdResponse> {
    return from(this.workspaceService.getWorkspaceByIdOrThrow(data.workspaceId))
      .pipe(map((workspace) => ({ workspace: convertDateToNumber(workspace) })));
  }

  @GrpcMethod('WorkspaceService')
  public getQuestionsByWorkspaceId(
    data: GetQuestionsByWorkspaceIdRequest,
  ): Observable<GetQuestionsByWorkspaceIdResponse> {
    return from(this.workspaceService.getQuestionsByWorkspaceId(data.id))
      .pipe(map((questions) => ({ questions: convertDateToNumber(questions) })));
  }

  @GrpcMethod('WorkspaceService')
  public getQuestionById(data: GetQuestionByIdRequest): Observable<GetQuestionByIdResponse> {
    return from(this.workspaceService.getQuestionByIdOrThrow(data.id))
      .pipe(map((questions) => ({ question: convertDateToNumber(questions) })));
  }

}
