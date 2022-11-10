import { Module } from '@nestjs/common';
import { GatewayController } from '@/controllers/GatewayController';
import { GatewayService } from '@/services/GatewayService';

@Module({
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
