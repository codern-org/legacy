import { Injectable } from '@nestjs/common';
import {
  Workspace, Question, ExpectedNotFoundError,
  WorkspaceWithParticipants,
  ExpectedInvalidError,
} from 'api-types';
import { QuestionRepository } from '@/repositories/QuestionRepository';
import { WorkspaceRepository } from '@/repositories/WorkspaceRepository';
import { WorkspaceError } from '@/utils/errors/WorkspaceError';
import { QuestionError } from '@/utils/errors/QuestionError';

@Injectable()
export class WorkspaceService {

  private readonly questionRepository: QuestionRepository;
  private readonly workspaceRepository: WorkspaceRepository;

  public constructor(
    questionRepository: QuestionRepository,
    workspaceRepository: WorkspaceRepository,
  ) {
    this.questionRepository = questionRepository;
    this.workspaceRepository = workspaceRepository;
  }

  public async validateUserInWorkspace(userId: string, workspaceId: number): Promise<void> {
    const participants = await this.workspaceRepository.getParticipantsByWorkspaceId(workspaceId);
    const isUserInWorkspace = participants.some((participant) => participant.userId === userId);
    if (!isUserInWorkspace) throw new ExpectedInvalidError(WorkspaceError.NoPermissionToAccess);
  }

  public async validateQuestionInWorkspace(questionId: number, workspaceId: number): Promise<void> {
    const question = await this.getQuestionByIdOrThrow(questionId);
    if (question.workspaceId !== workspaceId) {
      throw new ExpectedNotFoundError(QuestionError.NotFoundInWorkspace);
    }
  }

  public getAllWorkspacesByUserId(userId: string): Promise<WorkspaceWithParticipants[]> {
    return this.workspaceRepository.getAllWorkspacesByUserId(userId);
  }

  public async getWorkspaceByIdOrThrow(workspaceId: number): Promise<Workspace> {
    const workspace = await this.workspaceRepository.getWorkspaceById(workspaceId);
    if (!workspace) throw new ExpectedNotFoundError(WorkspaceError.NotFoundFromWorkspaceId);
    return workspace;
  }

  public getQuestionsByWorkspaceId(workspaceId: number): Promise<Question[]> {
    return this.questionRepository.getQuestionsByWorkspaceId(workspaceId);
  }

  public async getQuestionByIdOrThrow(id: number): Promise<Question> {
    const question = await this.questionRepository.getQuestionById(id);
    if (!question) throw new ExpectedNotFoundError(QuestionError.NotFoundFromQuestionId);
    return question;
  }

}
