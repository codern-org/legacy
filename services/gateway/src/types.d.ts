import { MultipartFile } from '@fastify/multipart';
import { PublicUser } from '@codern/external';

declare module 'fastify' {
  export interface FastifyRequest {
    user: PublicUser,
    multipartFile: MultipartFile,
  }
}
