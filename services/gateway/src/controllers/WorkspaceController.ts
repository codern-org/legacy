import {
  Controller, Inject, Get,
  UseGuards, Param,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { map, Observable } from 'rxjs';
import { PublicWorkspaceWithParticipants, Question, Workspace } from 'api-types';
import { AuthGuard } from '@/utils/AuthGuard';
import { WorkspaceService } from '@/services/WorkspaceService';
import { User } from '@/utils/decorators/AuthDecorator';
import { UserData } from '@/utils/guards/AuthGuard';
import { WorkspaceGuard } from '@/utils/guards/WorkspaceGuard';

@Controller('/workspaces')
export class WorkspaceController {

  private readonly workspaceService: WorkspaceService;

  public constructor(@Inject('WORKSPACE_PACKAGE') client: ClientGrpc) {
    this.workspaceService = client.getService('WorkspaceService');
  }

  @Get('/')
  @UseGuards(AuthGuard)
  public getAllWorkspacesByUserId(
    @User() user: UserData,
  ): Observable<PublicWorkspaceWithParticipants[]> {
    const userId = user.id;
    return this.workspaceService
      .getAllWorkspacesByUserId({ userId })
      .pipe(
        map((response) => response.workspaces),
        map((workspace) => workspace.map((data) => ({
          ...data.workspace,
          participants: data.participants
            .map((participant) => ({
              ...participant,
              workspaceId: undefined,
            })),
        }))),
      );
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
  ): Observable<Question[]> {
    return this.workspaceService
      .getQuestionsByWorkspaceId({ id })
      .pipe(map((response) => response.questions));
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
