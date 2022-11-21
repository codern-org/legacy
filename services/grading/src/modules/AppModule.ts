import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { LoggerConfig } from 'logger';
import { configuration } from '@/utils/Configuration';
import { GradingModule } from '@/modules/GradingModule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    WinstonModule.forRoot(LoggerConfig),

    GradingModule,
  ],
})
export class AppModule {}
