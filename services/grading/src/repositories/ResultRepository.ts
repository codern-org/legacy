import { Injectable } from '@nestjs/common';
import { Prisma, Result, Testcase } from '@prisma/client';
import { ResultStatus } from '@codern/internal';
import { PrismaService } from '@/services/PrismaService';

type ResultWithReferencedData = Result & { testcase: Testcase };

@Injectable()
export class ResultRepository {

  private readonly prismaService: PrismaService;

  public constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  public async createResultsAndReturnWithTestcase(
    submissionId: number,
    testcaseIds: number[],
  ): Promise<ResultWithReferencedData[]> {
    // const results = testcaseIds.map((testcaseId) => ({
    //   submissionId,
    //   testcaseId,
    //   status: ResultStatus.GRADING,
    // }));
    // await this.prismaService.result.createMany({ data: [...results] });

    // return this.prismaService.result.findMany({
    //   where: {
    //     submissionId,
    //     testcaseId: { in: testcaseIds },
    //   },
    //   include: {
    //     testcase: true,
    //   },
    // });

    // TODO: inspection on https://github.com/prisma/prisma/issues/8131

    return this.prismaService.$transaction(
      testcaseIds.map((testcaseId) => {
        const data = {
          submissionId,
          testcaseId,
          status: ResultStatus.GRADING,
        };
        return this.prismaService.result.create({
          data,
          include: {
            testcase: true,
          },
        });
      }),
    );
  }

  public getResultById(id: number): Promise<Result | null> {
    return this.prismaService.result.findUnique({ where: { id } });
  }

  public updateResult(id: number, data: Prisma.ResultUpdateInput): Promise<Result> {
    return this.prismaService.result.update({ data, where: { id } });
  }

}
