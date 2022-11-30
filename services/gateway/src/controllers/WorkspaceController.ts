import {
  Controller, Inject, Get,
  UseGuards, Param,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, map, Observable } from 'rxjs';
import {
  PublicUser, PublicWorkspaceWithParticipants, PublicQuestion,
  PublicWorkspace,
} from '@codern-api/external';
import { WorkspaceService } from '@/services/WorkspaceService';
import { User } from '@/utils/decorators/AuthDecorator';
import { AuthGuard } from '@/utils/guards/AuthGuard';
import { WorkspaceGuard } from '@/utils/guards/WorkspaceGuard';
import { AuthService } from '@/services/AuthService';
import { workspaceWithParticipants } from '@/utils/Serializer';

@Controller('/workspaces')
export class WorkspaceController {

  private readonly workspaceService: WorkspaceService;
  private readonly authService: AuthService;

  public constructor(
    @Inject('WORKSPACE_PACKAGE') workspaceClient: ClientGrpc,
    @Inject('AUTH_PACKAGE') authClient: ClientGrpc,
  ) {
    this.workspaceService = workspaceClient.getService('WorkspaceService');
    this.authService = authClient.getService('AuthService');
  }

  @Get('/')
  @UseGuards(AuthGuard)
  public async getAllWorkspacesByUserId(
    @User() userData: PublicUser,
  ): Promise<PublicWorkspaceWithParticipants[]> {
    const userId = userData.id;
    const { workspaces } = await firstValueFrom(
      this.workspaceService.getAllWorkspacesByUserId({ userId }),
    );
    const participantIds = workspaces
      .map((workspace) => workspace.participants.map((participant) => participant.userId))
      .flat();
    const { users } = await firstValueFrom(
      this.authService.getUserByIds({ userIds: participantIds }),
    );
    return workspaceWithParticipants(workspaces, users);
  }

  @Get('/:workspaceId')
  @UseGuards(AuthGuard, WorkspaceGuard)
  public getWorkspaceById(
    @Param('workspaceId') workspaceId: number,
  ): Observable<PublicWorkspace> {
    return this.workspaceService
      .getWorkspaceById({ workspaceId })
      .pipe(map((response) => response.workspace));
  }

  @Get('/:workspaceId/questions')
  @UseGuards(AuthGuard, WorkspaceGuard)
  public getQuestionsByWorkspaceId(
    @Param('workspaceId') id: number,
  ): Observable<PublicQuestion[]> {
    return this.workspaceService
      .getQuestionsByWorkspaceId({ id })
      .pipe(map((response) => response.questions));
  }

  @Get('/:workspaceId/questions/:questionId')
  @UseGuards(AuthGuard, WorkspaceGuard)
  public getQuestionById(
    @Param('questionId') id: number,
  ): Observable<PublicQuestion> {
    return this.workspaceService
      .getQuestionById({ id })
      .pipe(map((response) => response.question));
  }

}
