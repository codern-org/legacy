import { Injectable } from '@nestjs/common';
import { SessionRepository } from '@/repositories/SessionRepository';

@Injectable()
export class AuthService {

  private readonly sessionRepository: SessionRepository;

  public constructor(
    sessionRepository: SessionRepository,
  ) {
    this.sessionRepository = sessionRepository;
  }

}
