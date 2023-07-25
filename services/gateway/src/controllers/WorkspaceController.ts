import {
  Controller, Inject, Get,
  UseGuards, Param, Headers, Post,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, forkJoin, map } from 'rxjs';
import {
  PublicUser, PublicWorkspaceWithParticipants, PublicQuestion,
  PublicWorkspace,
} from '@codern/external';
import { QuestionLevel } from '@codern/internal';
import { WorkspaceService } from '@/services/WorkspaceService';
import { User } from '@/utils/decorators/AuthDecorator';
import { AuthGuard } from '@/utils/guards/AuthGuard';
import { WorkspaceGuard } from '@/utils/guards/WorkspaceGuard';
import { AuthService } from '@/services/AuthService';
import {
  getOwnerIdsFromWorkspaces, getParticipantsFromWorkspaces, publicQuestions,
  workspaceWithParticipants,
} from '@/utils/Serializer';
import { GradingService } from '@/services/GradingService';
import { WorkspaceOwnerGuard } from '@/utils/guards/WorkspaceOwnerGuard';
import { FileGuard } from '@/utils/guards/FileGuard';

@Controller('/workspaces')
export class WorkspaceController {

  private readonly workspaceService: WorkspaceService;
  private readonly authService: AuthService;
  private readonly gradingService: GradingService;

  public constructor(
    @Inject('WORKSPACE_PACKAGE') workspaceClient: ClientGrpc,
    @Inject('AUTH_PACKAGE') authClient: ClientGrpc,
    @Inject('GRADING_PACKAGE') gradingClient: ClientGrpc,
  ) {
    this.workspaceService = workspaceClient.getService('WorkspaceService');
    this.authService = authClient.getService('AuthService');
    this.gradingService = gradingClient.getService('GradingService');
  }

  @Get('/')
  @UseGuards(AuthGuard)
  public async getAllWorkspacesByUserId(
    @User() user: PublicUser,
  ): Promise<PublicWorkspaceWithParticipants[]> {
    const userId = user.id;
    const { workspaces } = await firstValueFrom(
      this.workspaceService.getAllWorkspacesByUserId({ userId }),
    );

    if (workspaces.length === 0) return [];

    // TODO: optimize
    const owners = await firstValueFrom(
      forkJoin(getOwnerIdsFromWorkspaces(workspaces)
        .map((ownerId) => this.authService.getOwnerDetail({ ownerId })
          .pipe(map((response) => response.owner)))),
    );
    const participantIds = getParticipantsFromWorkspaces(workspaces);
    const { users } = await firstValueFrom(
      this.authService.getUserByIds({ userIds: participantIds }),
    );
    return workspaceWithParticipants(workspaces, users, owners);
  }

  @Get('/:workspaceId')
  @UseGuards(AuthGuard, WorkspaceGuard)
  public async getWorkspaceById(
    @Param('workspaceId') workspaceId: number,
  ): Promise<PublicWorkspace> {
    const { workspace } = await firstValueFrom(
      this.workspaceService.getWorkspaceById({ workspaceId }),
    );
    const { owner } = await firstValueFrom(
      this.authService.getOwnerDetail({ ownerId: workspace.ownerId }),
    );
    return { ...workspace, ownerName: owner.displayName };
  }

  @Get('/:workspaceId/questions')
  @UseGuards(AuthGuard, WorkspaceGuard)
  public async getQuestionsByWorkspaceId(
    @Param('workspaceId') id: number,
    @User() user: PublicUser,
  ): Promise<PublicQuestion[]> {
    const { questions } = await firstValueFrom(
      this.workspaceService.getQuestionsByWorkspaceId({ id }),
    );
    const questionIds = questions.map((question) => question.id);
    const { questionSummaries } = await firstValueFrom(
      this.gradingService.getQuestionSummaryByIds({
        userId: user.id,
        questionIds,
      }),
    );
    return publicQuestions(questions, questionSummaries);
  }

  @Get('/:workspaceId/questions/:questionId')
  @UseGuards(AuthGuard, WorkspaceGuard)
  public async getQuestionById(
    @Param('questionId') id: number,
    @User() user: PublicUser,
  ): Promise<PublicQuestion> {
    const { question } = await firstValueFrom(
      this.workspaceService.getQuestionById({ id }),
    );
    const { questionSummaries } = await firstValueFrom(
      this.gradingService.getQuestionSummaryByIds({
        userId: user.id,
        questionIds: [question.id],
      }),
    );
    return publicQuestions([question], questionSummaries)[0];
  }

  @Post('/:workspaceId/questions')
  @UseGuards(AuthGuard, WorkspaceOwnerGuard)
  @UseGuards(FileGuard)
  public async createQuestion(
    // TODO: headers validation
    @Param('workspaceId') workspaceId: number,
    @Headers('question-name') name: string,
    @Headers('question-description') description: string,
    @Headers('question-memory-limit') memoryLimit: number,
    @Headers('question-time-limit') timeLimit: number,
    @Headers('question-level') level: QuestionLevel,
    @Headers('question-score') score: number,
  ): Promise<unknown> {
    const { question: createdWorkspaceQuestion } = await firstValueFrom(
      this.workspaceService.createWorkspaceQuestion({
        question: {
          workspaceId,
          name,
          description,
          timeLimit,
          memoryLimit,
          level,
        },
      }),
    );

    const { question: createdGradingQuestion } = await firstValueFrom(
      this.gradingService.createGradingQuestion({
        question: {
          questionId: createdWorkspaceQuestion.id,
          workspaceId,
          timeLimit,
          memoryLimit,
          score,
        },
      }),
    );

    return { createdWorkspaceQuestion, createdGradingQuestion };
  }

}
