import { Injectable } from '@nestjs/common';
import { Prisma, Submission } from '@prisma/client';
import { PrismaService } from '@/services/PrismaService';

@Injectable()
export class SubmissionRepository {

  private readonly prismaService: PrismaService;

  public constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  public createSubmission(submission: Prisma.SubmissionCreateInput): Promise<Submission> {
    return this.prismaService.submission.create({ data: submission });
  }

  public getSubmissionByQuestionIds(ids: number[]): Promise<Submission[]> {
    return this.prismaService.submission.findMany({
      where: {
        questionId: { in: ids },
      },
    });
  }

  public getSubmissionsByQuestionId(questionId: number): Promise<Submission[]> {
    return this.prismaService.submission.findMany({ where: { questionId } });
  }

  public updateSubmission(id: number, data: Prisma.SubmissionUpdateInput): Promise<Submission> {
    return this.prismaService.submission.update({ data, where: { id } });
  }

}
