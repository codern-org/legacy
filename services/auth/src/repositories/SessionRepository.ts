import { Injectable } from '@nestjs/common';
import { Session } from '@prisma/client';
import { PrismaService } from '@/services/PrismaService';

@Injectable()
export class SessionRepository {

  private readonly prismaService: PrismaService;

  public constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  public async getSessionById(id: string): Promise<Session | null> {
    return this.prismaService.session.findUnique({
      where: { id },
    });
  }

}
