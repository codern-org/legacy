import cookie from 'cookie';
import {
  ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect,
  OnGatewayInit, WebSocketGateway, WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '@/services/AuthService';

@WebSocketGateway({ cors: { origin: true, credentials: true } })
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  private server!: Server;

  private readonly authService: AuthService;
  private readonly socketByUserId: Map<string, Socket> = new Map();
  private readonly userIdBySocket: Map<Socket, string> = new Map();

  public constructor(
    @Inject('AUTH_PACKAGE') authClient: ClientGrpc,
  ) {
    this.authService = authClient.getService('AuthService');
  }

  public async handleConnection(@ConnectedSocket() client: Socket): Promise<void> {
    const cookieHeader = client.handshake.headers.cookie;
    if (!cookieHeader) {
      client.disconnect(true);
      return;
    }

    const cookies = cookie.parse(cookieHeader);
    const session = cookies.sid;
    if (!session) {
      client.disconnect(true);
      return;
    }

    const { user } = await firstValueFrom(this.authService.authenticate({ session }));
    this.socketByUserId.set(user.id, client);
    this.userIdBySocket.set(client, user.id);
  }

  public handleDisconnect(@ConnectedSocket() client: Socket): void {
    const userId = this.userIdBySocket.get(client);
    if (userId) this.socketByUserId.delete(userId);
    this.userIdBySocket.delete(client);
  }

  public afterInit(server: Server): void {
    this.server = server;
  }

  public getSocketByUserId(userId: string): Socket | null {
    return this.socketByUserId.get(userId) || null;
  }

}
