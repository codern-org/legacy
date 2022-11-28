import { MultipartFile } from '@fastify/multipart';
import { User } from 'api-types';

declare module 'fastify' {
  export interface FastifyRequest {
    user: User,
    multipartFile: MultipartFile,
  }
}
