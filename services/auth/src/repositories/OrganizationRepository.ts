import { Injectable } from '@nestjs/common';
import { Organization } from '@prisma/client';
import { PrismaService } from '@/services/PrismaService';

@Injectable()
export class OrganizationRepositroy {

  private readonly prismaService: PrismaService;

  public constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  public getOrganizationById(id: number): Promise<Organization | null> {
    return this.prismaService.organization.findUnique({ where: { id } });
  }

}
