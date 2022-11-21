import { AuthResponse } from 'api-types';

declare module 'fastify' {
  export interface FastifyRequest {
    user: AuthResponse,
  }
}
