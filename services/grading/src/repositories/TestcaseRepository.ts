import { Injectable } from '@nestjs/common';
import { Testcase } from '@prisma/client';
import { PrismaService } from '@/services/PrismaService';

@Injectable()
export class TestcaseRepository {

  private readonly prismaService: PrismaService;

  public constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  public getTestcasesByQuestionId(questionId: number): Promise<Testcase[]> {
    return this.prismaService.testcase.findMany({ where: { questionId } });
  }

}
