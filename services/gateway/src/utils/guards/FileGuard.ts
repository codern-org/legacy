import {
  BadRequestException, CanActivate, ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';

@Injectable()
export class FileGuard implements CanActivate {

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const data = await request.file();
    if (!data) throw new BadRequestException();

    request.multipartFile = data;

    return !!data;
  }

}
