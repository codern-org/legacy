import { Logger, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AuthController } from '@/controllers/AuthController';
import { AuthService } from '@/services/AuthService';
import { PrismaModule } from '@/modules/PrismaModule';
import { SessionRepository } from '@/repositories/SessionRepository';
import { GoogleService } from '@/services/GoogleService';

@Module({
  imports: [
    HttpModule,
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [
    Logger,
    ConfigService,

    GoogleService,
    AuthService,

    SessionRepository,
  ],
})
export class AuthModule {}
