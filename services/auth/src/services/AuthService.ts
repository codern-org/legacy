import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/services/PrismaService';

@Injectable()
export class AuthService {

  private readonly prismaService: PrismaService;

  public constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  public getSession(userId: number): number {
    return userId + 1;
  }

}
