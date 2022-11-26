import { Module } from '@nestjs/common';
import { PrismaService } from '@/services/PrismaService';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
