import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerConfig } from 'logger';
import { WinstonModule } from 'nest-winston';
import { AuthModule } from '@/modules/AuthModule';
import { GatewayModule } from '@/modules/GatewayModule';
import { GradingModule } from '@/modules/GradingModule';
import { configuration } from '@/utils/Configuration';
import { WorkspaceModule } from '@/modules/WorkspaceModule';
import { FileModule } from '@/modules/FileModule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    WinstonModule.forRoot(LoggerConfig),

    GatewayModule,
    AuthModule,
    FileModule,
    GradingModule,
    WorkspaceModule,
  ],
})
export class AppModule {}
