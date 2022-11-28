import {
  CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { FastifyRequest } from 'fastify';
import { firstValueFrom } from 'rxjs';
import { User } from 'api-types';
import { AuthService } from '@/services/AuthService';

@Injectable()
export class AuthGuard implements CanActivate {

  private readonly client: ClientGrpc;

  public constructor(@Inject('AUTH_PACKAGE') client: ClientGrpc) {
    this.client = client;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const session = request.cookies.sid;
    if (!session) throw new UnauthorizedException();

    const authService = this.client.getService<AuthService>('AuthService');
    const { user } = await firstValueFrom(authService.authenticate({ session }));

    // Mutate user data from session into request instance
    request.user = user;

    return !!user.id;
  }

}

export type UserData = User;
