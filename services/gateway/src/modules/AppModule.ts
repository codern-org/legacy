import { Module } from '@nestjs/common';
import { GatewayModule } from '@/modules/gateway/GatewayModule';
import { AuthModule } from '@/modules/auth/AuthModule';

@Module({
  imports: [
    GatewayModule,
    AuthModule,
  ],
})
export class AppModule {}
