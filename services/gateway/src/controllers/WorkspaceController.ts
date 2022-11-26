import {
  Controller, Inject, Get,
  UseGuards,
  Param,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { GetAllWorkspacesByUserIdResponse, GetWorkspaceByIdResponse } from 'api-types/src/workspace/message';
import { AuthGuard } from '@/utils/AuthGuard';
import { WorkspaceService } from '@/services/WorkspaceService';
import { User } from '@/utils/decorators/AuthDecorator';
import { UserData } from '@/utils/guards/AuthGuard';
import { WorkspaceGuard } from '@/utils/guards/WorkspaceGuard';

@Controller('/workspace')
export class WorkspaceController {

  private readonly configService: ConfigService;
  private readonly workspaceService: WorkspaceService;

  public constructor(
    configService: ConfigService,
    @Inject('WORKSPACE_PACKAGE') client: ClientGrpc,
  ) {
    this.configService = configService;
    this.workspaceService = client.getService('WorkspaceService');
  }

  @Get('/')
  @UseGuards(AuthGuard)
  public getAllWorkspaces(
    @User() user: UserData,
  ): Observable<GetAllWorkspacesByUserIdResponse> {
    const userId = user.id;
    return this.workspaceService.getAllWorkspacesByUserId({ userId });
  }

  @Get('/:workspaceId')
  @UseGuards(AuthGuard, WorkspaceGuard)
  public getWorkspaceById(
    @Param('workspaceId') params: number,
  ): Observable<GetWorkspaceByIdResponse> {
    return this.workspaceService.getWorkspaceById({ workspaceId: params });
  }

}
