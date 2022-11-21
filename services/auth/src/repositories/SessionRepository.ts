import { Injectable } from '@nestjs/common';
import { Prisma, Session } from '@prisma/client';
import { PrismaService } from '@/services/PrismaService';

@Injectable()
export class SessionRepository {

  private readonly prismaService: PrismaService;

  public constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  public createSession(session: Prisma.SessionCreateInput): Promise<Session> {
    return this.prismaService.session.create({ data: session });
  }

  public getSessionById(id: string): Promise<Session | null> {
    return this.prismaService.session.findUnique({ where: { id } });
  }

  public getFirstSessionWhere(where: Prisma.SessionWhereInput): Promise<Session | null> {
    return this.prismaService.session.findFirst({ where });
  }

  public async deleteSession(where: Prisma.SessionWhereInput): Promise<void> {
    // TODO: track https://github.com/prisma/prisma/issues/4072
    await this.prismaService.session.deleteMany({ where });
  }

}
