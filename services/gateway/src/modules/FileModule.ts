import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FileController } from '@/controllers/FileController';
import { FileService } from '@/services/FileService';
import { SharedModule } from '@/modules/SharedModule';

@Module({
  imports: [
    SharedModule,
    HttpModule,
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
