import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GatewayModule } from '@/modules/GatewayModule';
import { AuthModule } from '@/modules/AuthModule';
import { configuration } from '@/utils/Configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),

    GatewayModule,
    AuthModule,
  ],
})
export class AppModule {}
