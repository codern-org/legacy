import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GradingController } from '@/controllers/GradingController';
import { SharedModule } from '@/modules/SharedModule';
import { FileService } from '@/services/FileService';

@Module({
  imports: [
    SharedModule,
    HttpModule,
  ],
  controllers: [GradingController],
  providers: [FileService],
})
export class GradingModule {}
