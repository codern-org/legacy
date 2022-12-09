import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from '@/controllers/AuthController';
import { AuthService } from '@/services/AuthService';
import { PrismaModule } from '@/modules/PrismaModule';
import { SessionRepository } from '@/repositories/SessionRepository';
import { GoogleService } from '@/services/GoogleService';
import { UserRepository } from '@/repositories/UserRepository';
import { UserService } from '@/services/UserService';
import { SessionService } from '@/services/SessionService';
import { OrganizationRepositroy } from '@/repositories/OrganizationRepository';
import { OrganizationService } from '@/services/OrganizationService';

@Module({
  imports: [
    HttpModule,
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [
    OrganizationRepositroy,
    SessionRepository,
    UserRepository,

    AuthService,
    GoogleService,
    OrganizationService,
    SessionService,
    UserService,
  ],
})
export class AuthModule {}
