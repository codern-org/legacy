import { MultipartFile } from '@fastify/multipart';
import { PublicUser } from '@codern-api/external';

declare module 'fastify' {
  export interface FastifyRequest {
    user: PublicUser,
    multipartFile: MultipartFile,
  }
}
