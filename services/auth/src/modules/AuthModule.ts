import { Module } from '@nestjs/common';
import { AuthController } from '@/controllers/AuthController';
import { AuthService } from '@/services/AuthService';
import { PrismaModule } from '@/modules/PrismaModule';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
