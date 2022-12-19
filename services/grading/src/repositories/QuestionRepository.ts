import { Injectable } from '@nestjs/common';
import { Question } from '@prisma/client';
import { PrismaService } from '@/services/PrismaService';

@Injectable()
export class QuestionRepository {

  private readonly prismaService: PrismaService;

  public constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  public getQuestionByQuestionId(questionId: number): Promise<Question | null> {
    return this.prismaService.question.findUnique({ where: { questionId } });
  }

}
