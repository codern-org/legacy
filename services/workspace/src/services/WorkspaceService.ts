import { Injectable } from '@nestjs/common';
import {
  Workspace, Question, ExpectedNotFoundError,
  WorkspaceWithParticipants,
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

  public async isInWorkspace(userId: string, workspaceId: number): Promise<boolean> {
    const participants = await this.workspaceRepository.getParticipantsByWorkspaceId(workspaceId);
    return participants.some((participant) => participant.userId === userId);
  }

  public async isQuestionInWorkspace(questionId: number, workspaceId: number): Promise<boolean> {
    const questions = await this.questionRepository.getQuestionsByWorkspaceId(workspaceId);
    return questions.some((question) => question.id === questionId);
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
