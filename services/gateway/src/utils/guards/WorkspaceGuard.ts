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

  private readonly workspaceService: WorkspaceService;

  public constructor(@Inject('WORKSPACE_PACKAGE') client: ClientGrpc) {
    this.workspaceService = client.getService<WorkspaceService>('WorkspaceService');
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const { workspaceId, questionId } = request.params as WorkspaceGuardParams;
    if (!workspaceId) throw new BadRequestException();

    const userId = request.user.id;

    await firstValueFrom(
      this.workspaceService.validateUserInWorkspace({ userId, workspaceId: +workspaceId }),
    );

    if (questionId) {
      await firstValueFrom(this.workspaceService.validateQuestionInWorkspace(
        { questionId: +questionId, workspaceId: +workspaceId },
      ));
    }

    return true;
  }

}
