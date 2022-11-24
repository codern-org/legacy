import { Injectable } from '@nestjs/common';
import { Prisma, Question } from '@prisma/client';
import { PrismaService } from '@/services/PrismaService';

@Injectable()
export class QuestionRepository {

  private readonly prismaService: PrismaService;

  public constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  public createQuestion(question: Prisma.QuestionCreateInput): Promise<Question> {
    return this.prismaService.question.create({ data: question });
  }

  public getQuestionsByWorkspaceId(id: number): Promise<Question[]> {
    return this.prismaService.question.findMany({ where: { workspaceId: id } });
  }

  public getQuestionById(id: number): Promise<Question | null> {
    return this.prismaService.question.findUnique({ where: { id } });
  }

}
