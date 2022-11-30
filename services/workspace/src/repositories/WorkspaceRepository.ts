import { Injectable } from '@nestjs/common';
import { Prisma, Workspace, WorkspaceParticipants } from '@prisma/client';
import { WorkspaceWithParticipants } from '@codern/internal';
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

  public async getAllWorkspacesByUserId(userId: string): Promise<WorkspaceWithParticipants[]> {
    const userWorkspaces = await this.prismaService.workspaceParticipants.findMany({
      where: { userId },
      include: { workspace: true },
    });

    const workspaceIds = userWorkspaces.map((workspace) => workspace.workspaceId);
    const participantsIncludeUser = await this.prismaService.workspaceParticipants.findMany({
      where: { workspaceId: { in: workspaceIds } },
    });

    const workspaceWithParticipants = userWorkspaces.map((workspace) => {
      const participants = participantsIncludeUser
        .filter((participant) => participant.workspaceId === workspace.workspaceId);
      return {
        workspace: workspace.workspace,
        participants,
      };
    });

    return workspaceWithParticipants;
  }

  public getWorkspaceById(id: number): Promise<Workspace | null> {
    return this.prismaService.workspace.findUnique({ where: { id } });
  }

  public getParticipantsByWorkspaceId(workspaceId: number): Promise<WorkspaceParticipants[]> {
    return this.prismaService.workspaceParticipants.findMany({ where: { workspaceId } });
  }

  public getFirstWorkspaceParticipantsWhere(
    where: Prisma.WorkspaceParticipantsWhereInput,
  ): Promise<WorkspaceParticipants | null> {
    return this.prismaService.workspaceParticipants.findFirst({ where });
  }

}
