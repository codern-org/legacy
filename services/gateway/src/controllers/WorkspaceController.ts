import {
  Controller, Inject, Get,
  UseGuards,
  Param,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc } from '@nestjs/microservices';
import { map, Observable } from 'rxjs';
import {
  GetAllWorkspacesByUserIdResponse, GetQuestionsByWorkspaceIdResponse,
  Question,
  Workspace,
} from 'api-types';
import { AuthGuard } from '@/utils/AuthGuard';
import { WorkspaceService } from '@/services/WorkspaceService';
import { User } from '@/utils/decorators/AuthDecorator';
import { UserData } from '@/utils/guards/AuthGuard';
import { WorkspaceGuard } from '@/utils/guards/WorkspaceGuard';

@Controller('/workspaces')
export class WorkspaceController {

  private readonly configService: ConfigService;
  private readonly workspaceService: WorkspaceService;

  public constructor(
    configService: ConfigService,
    @Inject('WORKSPACE_PACKAGE') client: ClientGrpc,
  ) {
    this.configService = configService;
    this.workspaceService = client.getService('WorkspaceService');
  }

  @Get('/')
  @UseGuards(AuthGuard)
  public getAllWorkspacesByUserId(
    @User() user: UserData,
  ): Observable<GetAllWorkspacesByUserIdResponse> {
    const userId = user.id;
    return this.workspaceService.getAllWorkspacesByUserId({ userId });
  }

  @Get('/:workspaceId')
  @UseGuards(AuthGuard, WorkspaceGuard)
  public getWorkspaceById(
    @Param('workspaceId') workspaceId: number,
  ): Observable<Workspace> {
    return this.workspaceService
      .getWorkspaceById({ workspaceId })
      .pipe(map((response) => response.workspace));
  }

  @Get('/:workspaceId/questions')
  @UseGuards(AuthGuard, WorkspaceGuard)
  public getQuestionsByWorkspaceId(
    @Param('workspaceId') id: number,
  ): Observable<GetQuestionsByWorkspaceIdResponse> {
    return this.workspaceService.getQuestionsByWorkspaceId({ id });
  }

  @Get('/:workspaceId/questions/:questionId')
  @UseGuards(AuthGuard, WorkspaceGuard)
  public getQuestionById(
    @Param('questionId') id: number,
  ): Observable<Question> {
    return this.workspaceService
      .getQuestionById({ id })
      .pipe(map((response) => response.question));
  }

}
