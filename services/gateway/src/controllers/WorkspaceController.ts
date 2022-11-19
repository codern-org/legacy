import { Controller, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc } from '@nestjs/microservices';

@Controller('/workspace')
export class WorkspaceController {

  private readonly client: ClientGrpc;
  private readonly configService: ConfigService;

  public constructor(
    configService: ConfigService,
    @Inject('AUTH_PACKAGE') client: ClientGrpc,
  ) {
    this.client = client;
    this.configService = configService;
  }

}
