import { Module } from '@nestjs/common';
import { AuthController } from '@/controllers/AuthController';
import { SharedModule } from '@/modules/SharedModule';

@Module({
  imports: [SharedModule],
  controllers: [AuthController],
})
export class AuthModule {}
