import { Injectable } from '@nestjs/common';
import { Prisma, Question } from '@prisma/client';
import { PrismaService } from '@/services/PrismaService';

@Injectable()
export class QuestionRepository {

  private readonly prismaService: PrismaService;

  public constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  public async createQuestion(question: Prisma.QuestionCreateInput): Promise<Question> {
    const createdQuestion = await this.prismaService.question.create({ data: question });

    return createdQuestion;
  }

}
