import { Injectable } from '@nestjs/common';
import { Prisma, Workspace, WorkspaceParticipants } from '@prisma/client';
import { PrismaService } from '@/services/PrismaService';

@Injectable()
export class WorkspaceRepository {

  private readonly prismaService: PrismaService;

  public constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  public createWorkspace(workspace: Prisma.WorkspaceCreateInput): Promise<Workspace> {
    return this.prismaService.workspace.create({ data: workspace });
  }

  public getAllWorkspaces(userId: string): Promise<Workspace[]> {
    return this.prismaService.workspace.findMany({ where: { ownerId: userId } });
  }

  public getWorkspaceById(id: number): Promise<Workspace | null> {
    return this.prismaService.workspace.findUnique({ where: { id } });
  }

  public getParticipantsByWorkspaceId(workspaceId: number): Promise<WorkspaceParticipants[]> {
    return this.prismaService.workspaceParticipants.findMany({ where: { workspaceId } });
  }

}
