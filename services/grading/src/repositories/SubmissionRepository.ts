import { Injectable } from '@nestjs/common';
import {
  Prisma, Submission, Question,
  Result,
} from '@prisma/client';
import { PrismaService } from '@/services/PrismaService';

type SubmissionWithResults = Submission & { results: Result[] };
type SubmissionWithQuestion = Submission & { question: Question };

@Injectable()
export class SubmissionRepository {

  private readonly prismaService: PrismaService;

  public constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  public createSubmission(submission: Prisma.SubmissionCreateInput): Promise<Submission> {
    return this.prismaService.submission.create({ data: submission });
  }

  public getSubmissionWithQuestionById(id: number): Promise<SubmissionWithQuestion | null> {
    return this.prismaService.submission.findUnique({
      where: { id },
      include: { question: true },
    });
  }

  public getSubmissionWithRessultsById(id: number): Promise<SubmissionWithResults | null> {
    return this.prismaService.submission.findUnique({
      where: { id },
      include: { results: true },
    });
  }

  public getSubmissionWithResultsByQuestionIds(
    ids: number[],
    userId?: string,
  ): Promise<SubmissionWithResults[]> {
    return this.prismaService.submission.findMany({
      where: {
        userId,
        questionId: { in: ids },
      },
      include: { results: true },
    });
  }

  public getSubmissionsWithResultsByQuestionId(
    questionId: number,
    userId?: string,
  ): Promise<SubmissionWithResults[]> {
    return this.prismaService.submission.findMany({
      where: { questionId, userId },
      include: { results: true },
      orderBy: { uploadedAt: 'desc' },
    });
  }

  public updateSubmission(id: number, data: Prisma.SubmissionUpdateInput): Promise<Submission> {
    return this.prismaService.submission.update({ data, where: { id } });
  }

}
