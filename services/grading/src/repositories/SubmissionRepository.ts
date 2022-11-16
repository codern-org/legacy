import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/services/PrismaService';

@Injectable()
export class SubmissionRepository {

  private readonly prismaService: PrismaService;

  public constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

}
