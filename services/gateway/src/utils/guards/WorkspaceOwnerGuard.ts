import {
  BadRequestException,
  CanActivate, ExecutionContext, Inject, Injectable,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { FastifyRequest } from 'fastify';
import { firstValueFrom } from 'rxjs';
import { WorkspaceService } from '@/services/WorkspaceService';

type WorkspaceGuardParams = {
  workspaceId: string | undefined,
  questionId: string | undefined,
};

@Injectable()
export class WorkspaceOwnerGuard implements CanActivate {

  private readonly workspaceService: WorkspaceService;

  public constructor(@Inject('WORKSPACE_PACKAGE') client: ClientGrpc) {
    this.workspaceService = client.getService<WorkspaceService>('WorkspaceService');
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const { workspaceId } = request.params as WorkspaceGuardParams;
    if (!workspaceId) throw new BadRequestException();

    const { workspace } = await firstValueFrom(
      this.workspaceService.getWorkspaceById({ workspaceId: Number(workspaceId) }),
    );

    return workspace.ownerId === request.user.id;
  }

}
