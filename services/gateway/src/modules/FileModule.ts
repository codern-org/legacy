import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FileController } from '@/controllers/FileController';
import { FileService } from '@/services/FileService';

@Module({
  imports: [HttpModule],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
