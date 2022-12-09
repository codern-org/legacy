import { Injectable } from '@nestjs/common';
import { Organization } from '@prisma/client';
import { ExpectedNotFoundError } from '@codern/internal';
import { OrganizationRepositroy } from '@/repositories/OrganizationRepository';
import { OrganizationError } from '@/utils/errors/OrganizationError';

@Injectable()
export class OrganizationService {

  private readonly organizationRepository: OrganizationRepositroy;

  public constructor(organizationRepository: OrganizationRepositroy) {
    this.organizationRepository = organizationRepository;
  }

  public async getOrganizationOrThrow(id: number): Promise<Organization> {
    const organization = await this.organizationRepository.getOrganizationById(id);
    if (!organization) throw new ExpectedNotFoundError(OrganizationError.NotFound);
    return organization;
  }

}
