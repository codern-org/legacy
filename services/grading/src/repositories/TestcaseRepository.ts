import { Injectable } from '@nestjs/common';
import { Prisma, Testcase } from '@prisma/client';
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

  public createTestcaseByQuestionId(testcase: Prisma.TestcaseCreateInput): Promise<Testcase> {
    return this.prismaService.testcase.create({ data: testcase });
  }

}
