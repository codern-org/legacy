import { Logger, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PrismaModule } from '@/modules/PrismaModule';
import { GradingController } from '@/controllers/GradingController';

@Module({
  imports: [
    HttpModule,
    PrismaModule,
  ],
  controllers: [GradingController],
  providers: [
    Logger,
    ConfigService,
  ],
})
export class GradingModule {}
