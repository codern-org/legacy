import { Module } from '@nestjs/common';
import { GatewayModule } from '@/modules/GatewayModule';
import { AuthModule } from '@/modules/AuthModule';
import { SharedModule } from '@/modules/SharedModule';

@Module({
  imports: [
    SharedModule,
    GatewayModule,
    AuthModule,
  ],
})
export class AppModule {}
