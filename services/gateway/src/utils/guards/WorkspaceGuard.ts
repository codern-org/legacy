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
export class WorkspaceGuard implements CanActivate {

  private readonly client: ClientGrpc;

  public constructor(@Inject('WORKSPACE_PACKAGE') client: ClientGrpc) {
    this.client = client;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const userId = request.user.id;

    const { workspaceId, questionId } = request.params as WorkspaceGuardParams;
    if (!workspaceId) throw new BadRequestException();

    const workspaceService = this.client.getService<WorkspaceService>('WorkspaceService');

    if (questionId) {
      const result = await firstValueFrom(workspaceService.isQuestionInWorkspace(
        { questionId: +questionId, workspaceId: +workspaceId },
      ));
      if (!result.isQuestionInWorkspace) throw new BadRequestException();
    }

    const result = await firstValueFrom(workspaceService.isInWorkspace(
      { userId, workspaceId: +workspaceId },
    ));

    return result.isInWorkspace;

  }

}
