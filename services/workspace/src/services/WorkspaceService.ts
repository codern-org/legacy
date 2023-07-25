import { Injectable } from '@nestjs/common';
import {
  ExpectedNotFoundError,
  ExpectedForbiddenError,
  WorkspaceWithParticipants,
  CreateWorkspaceQuestionRequest,
} from '@codern/internal';
import { Workspace, Question } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { Timestamp } from '@codern/shared/src/time';
import { QuestionRepository } from '@/repositories/QuestionRepository';
import { WorkspaceRepository } from '@/repositories/WorkspaceRepository';
import { WorkspaceError } from '@/utils/errors/WorkspaceError';
import { QuestionError } from '@/utils/errors/QuestionError';

@Injectable()
export class WorkspaceService {

  private readonly configService: ConfigService;
  private readonly questionRepository: QuestionRepository;
  private readonly workspaceRepository: WorkspaceRepository;

  public constructor(
    configService: ConfigService,
    questionRepository: QuestionRepository,
    workspaceRepository: WorkspaceRepository,
  ) {
    this.configService = configService;
    this.questionRepository = questionRepository;
    this.workspaceRepository = workspaceRepository;
  }

  public async validateUserInWorkspace(userId: string, workspaceId: number): Promise<void> {
    const userInWorkspace = await this.workspaceRepository
      .getFirstWorkspaceParticipantsWhere({ userId, workspaceId });
    if (!userInWorkspace) throw new ExpectedForbiddenError(WorkspaceError.Forbidden);
  }

  public async validateQuestionInWorkspace(questionId: number, workspaceId: number): Promise<void> {
    const question = await this.getQuestionByIdOrThrow(questionId);
    if (question.workspaceId !== workspaceId) {
      throw new ExpectedNotFoundError(QuestionError.NotFoundInWorkspace);
    }
  }

  public toPublicWorkspaceProfileUrl(workspace: Workspace): Workspace {
    const convertedWorkspace = workspace;
    const publicFileUrl = this.configService.get<string>('publicFileUrl');
    convertedWorkspace.profilePath = publicFileUrl + workspace.profilePath;
    return convertedWorkspace;
  }

  public async getAllWorkspacesByUserId(userId: string): Promise<WorkspaceWithParticipants[]> {
    const workspacesWithParticipants = await this.workspaceRepository
      .getAllWorkspacesByUserId(userId);
    return workspacesWithParticipants.map((workspaceWithParticipants) => ({
      workspace: this.toPublicWorkspaceProfileUrl(workspaceWithParticipants.workspace),
      participants: workspaceWithParticipants.participants,
    }));
  }

  public async getWorkspaceByIdOrThrow(workspaceId: number): Promise<Workspace> {
    const workspace = await this.workspaceRepository.getWorkspaceById(workspaceId);
    if (!workspace) throw new ExpectedNotFoundError(WorkspaceError.NotFoundFromWorkspaceId);
    return this.toPublicWorkspaceProfileUrl(workspace);
  }

  public toPublicQuestionDetailUrl(question: Question): Question {
    const convertedQuestion = question;
    const publicFileUrl = this.configService.get<string>('publicFileUrl');
    convertedQuestion.detailPath = publicFileUrl + question.detailPath;
    return convertedQuestion;
  }

  public async getQuestionsByWorkspaceId(workspaceId: number): Promise<Question[]> {
    const questions = await this.questionRepository.getQuestionsByWorkspaceId(workspaceId);
    return questions.map((question) => this.toPublicQuestionDetailUrl(question));
  }

  public async getQuestionByIdOrThrow(id: number): Promise<Question> {
    const question = await this.questionRepository.getQuestionById(id);
    if (!question) throw new ExpectedNotFoundError(QuestionError.NotFoundFromQuestionId);
    return this.toPublicQuestionDetailUrl(question);
  }

  public async createQuestion(question: CreateWorkspaceQuestionRequest['question']): Promise<Question> {
    const createdQuestion = await this.questionRepository.createQuestion({
      name: question.name,
      description: question.description,
      timeLimit: question.timeLimit,
      memoryLimit: question.memoryLimit,
      level: question.level,
      detailPath: '',
      createdAt: Timestamp.now(),
      workspace: {
        connect: {
          id: question.workspaceId,
        },
      },
    });

    const updatedPathQuestion = await this.questionRepository.updateQuestionById(
      createdQuestion.id,
      { detailPath: `workspaces/${question.workspaceId}/questions/${createdQuestion.id}/question.md` },
    );

    return updatedPathQuestion;
  }

}
