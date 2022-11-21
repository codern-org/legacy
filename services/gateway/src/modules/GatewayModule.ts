import { Module } from '@nestjs/common';
import { GatewayController } from '@/controllers/GatewayController';
import { GatewayService } from '@/services/GatewayService';
import { SharedModule } from '@/modules/SharedModule';

@Module({
  imports: [SharedModule],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
