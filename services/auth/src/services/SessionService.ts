import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/services/PrismaService';

@Injectable()
export class SessionService {

  private readonly prismaService: PrismaService;

  public constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

}
