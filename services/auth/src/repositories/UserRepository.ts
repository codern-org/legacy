import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '@/services/PrismaService';

@Injectable()
export class UserRepository {

  private readonly prismaService: PrismaService;

  public constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  public createUser(user: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({ data: user });
  }

  public getUserById(id: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  public getFirstUserWhere(where: Prisma.UserWhereInput): Promise<User | null> {
    return this.prismaService.user.findFirst({ where });
  }

  public updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prismaService.user.update({ data, where: { id } });
  }

}
