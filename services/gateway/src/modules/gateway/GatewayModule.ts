import { Module } from '@nestjs/common';
import { GatewayController } from '@/modules/gateway/GatewayController';
import { GatewayService } from '@/modules/gateway/GatewayService';

@Module({
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
