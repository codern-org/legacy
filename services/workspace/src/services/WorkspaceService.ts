import { QuestionRepository } from '@/repositories/QuestionRepository';
import { WorkspaceRepository } from '@/repositories/WorkspaceRepository';
import { WorkspaceError } from '@/utils/errors/WorkspaceError';
import { QuestionError } from '@/utils/errors/QuestionError';
import { Injectable } from '@nestjs/common';
import { ExpectedNotFoundError, GetAllWorkspacesResponse, GetQuestionByIdResponse, GetQuestionsByWorkspaceIdResponse, GetWorkspaceByIdResponse } from 'api-types';
import { Workspace, Question } from 'api-types';
import { Workspace as WorkspacePrisma, Question as QuestionPrisma } from '@prisma/client'

@Injectable()
export class WorkspaceService {

  private readonly questionRepository: QuestionRepository
  private readonly workspaceRepository: WorkspaceRepository

  public constructor(
    questionRepository: QuestionRepository,
    workspaceRepository: WorkspaceRepository
  ) {
    this.questionRepository = questionRepository;
    this.workspaceRepository = workspaceRepository;
  }

  public async getAllWorkspaces(userId: string): Promise<GetAllWorkspacesResponse> {
    const workspaces = await this.workspaceRepository.getAllWorkspaces(userId);
    return { workspaces: workspaces.map(this.changeWorkspaceToApiType) };
  }

  public async getWorkspaceById(workspaceId: number): Promise<GetWorkspaceByIdResponse> {
    const workspace = await this.workspaceRepository.getWorkspaceById(workspaceId);
    if (!workspace) throw new ExpectedNotFoundError(WorkspaceError.NotFoundFromWorkspaceId);
    return { workspace: this.changeWorkspaceToApiType(workspace) }
  }

  public async getQuestionsByWorkspaceId(workspaceId: number): Promise<GetQuestionsByWorkspaceIdResponse> {
    const { workspace } = await this.getWorkspaceById(workspaceId);
    const questions = await this.questionRepository.getQuestionsByWorkspaceId(workspaceId);
    return { workspace, questions: questions.map(this.changeQuestionToApiType) }
  }

  public async getQuestionById(id: number): Promise<GetQuestionByIdResponse> {
    const question = await this.questionRepository.getQuestionById(id);
    if (!question) throw new ExpectedNotFoundError(QuestionError.NotFoundFromQuestionId);
    return { question: this.changeQuestionToApiType(question) };
  }

  private changeWorkspaceToApiType(workspace: WorkspacePrisma): Workspace {
    return { ...workspace, createdAt: workspace.createdAt.getTime(), }
  }

  private changeQuestionToApiType(question: QuestionPrisma): Question {
    return { ...question, createdAt: question.createdAt.getTime(), }
  }


}
