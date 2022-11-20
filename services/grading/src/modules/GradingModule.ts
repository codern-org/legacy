import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '@/modules/PrismaModule';
import { GradingController } from '@/controllers/GradingController';
import { QuestionRepository } from '@/repositories/QuestionRepository';
import { SubmissionRepository } from '@/repositories/SubmissionRepository';
import { GradingService } from '@/services/GradingService';

@Module({
  imports: [
    HttpModule,
    PrismaModule,
  ],
  controllers: [GradingController],
  providers: [
    QuestionRepository,
    SubmissionRepository,

    GradingService,
  ],
})
export class GradingModule {}
