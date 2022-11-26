import {
  BadRequestException,
  CanActivate, ExecutionContext, Inject, Injectable,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { FastifyRequest } from 'fastify';
import { firstValueFrom } from 'rxjs';
import { WorkspaceService } from '@/services/WorkspaceService';

@Injectable()
export class WorkspaceGuard implements CanActivate {

  private readonly client: ClientGrpc;

  public constructor(@Inject('WORKSPACE_PACKAGE') client: ClientGrpc) {
    this.client = client;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const userId = request.user.id;

    const { workspaceId } = request.params as { workspaceId: string | undefined };
    if (!workspaceId) throw new BadRequestException();

    const workspaceService = this.client.getService<WorkspaceService>('WorkspaceService');
    const result = await firstValueFrom(workspaceService.IsInWorkspace(
      { userId, workspaceId: +workspaceId },
    ));

    return result.isInWorkspace;

  }

}
