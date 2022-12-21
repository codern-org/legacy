import {
  CanActivate, ExecutionContext, Inject,
  Injectable, UnauthorizedException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { FastifyRequest } from 'fastify';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '@/services/AuthService';

@Injectable()
export class AuthGuard implements CanActivate {

  private readonly authService: AuthService;

  public constructor(@Inject('AUTH_PACKAGE') authClient: ClientGrpc) {
    this.authService = authClient.getService('AuthService');
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const session = request.cookies.sid;
    if (!session) throw new UnauthorizedException();

    const { user } = await firstValueFrom(this.authService.authenticate({ session }));

    // Mutate user data from session into request instance
    request.user = user;

    return !!user.id;
  }

}
