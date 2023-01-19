import { Injectable } from '@nestjs/common';
import {
  Prisma, Submission, Question,
  Result,
} from '@prisma/client';
import { Rank } from '@codern/internal';
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

  // TODO: hardcoded for BMH2023
  public async getRanking(): Promise<Rank[]> {
    const ranking = await this.prismaService.$queryRaw<Rank[]>`SELECT t4.userId, SUM(t4.score) as totalScore, (SELECT MAX(uploadedAt) FROM Submission WHERE userId = t4.userId) as lastUploadedAt FROM (SELECT t3.*, ((t3.passedCases/t3.totalCases)*t3.questionMaxScore) as score FROM (SELECT t2.*, (SELECT COUNT(*) FROM Result WHERE submissionId = t2.lastSubmissionId) as totalCases, (SELECT COUNT(*) FROM Result WHERE submissionId = t2.lastSubmissionId AND status = "PASSED") as passedCases, (SELECT score FROM Question WHERE id = questionId) as questionMaxScore FROM( SELECT t1.*, (SELECT id FROM Submission WHERE userId = t1.userId AND questionId = t1.questionId ORDER BY id DESC LIMIT 1) AS lastSubmissionId FROM (SELECT DISTINCT questionId, userId FROM Submission ) as t1 ) as t2) as t3) as t4 GROUP BY userId ORDER BY totalScore DESC, lastUploadedAt ASC;`;

    const serializedRanking = ranking.map((entry) => ({
      ...entry,
      submissionCount: Number(entry.submissionCount),
      lastUploadedAt: Number(entry.lastUploadedAt),
    }));
    return serializedRanking;
  }

}
