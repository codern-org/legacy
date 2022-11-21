import { MultipartFile } from '@fastify/multipart';
import { AuthResponse } from 'api-types';

declare module 'fastify' {
  export interface FastifyRequest {
    user: AuthResponse,
    multipartFile: MultipartFile,
  }
}
