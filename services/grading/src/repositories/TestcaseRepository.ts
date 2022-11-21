import { Injectable } from '@nestjs/common';
import { Testcase } from '@prisma/client';
import { PrismaService } from '@/services/PrismaService';

@Injectable()
export class TestcaseRepository {

  private readonly prismaService: PrismaService;

  public constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  public getTestcaseByQuestionId(questionId: number): Promise<Testcase | null> {
    return this.prismaService.testcase.findUnique({ where: { questionId } });
  }

}
