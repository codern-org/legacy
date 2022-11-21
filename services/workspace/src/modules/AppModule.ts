import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerConfig } from 'logger';
import { WinstonModule } from 'nest-winston';
import { configuration } from '@/utils/Configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    WinstonModule.forRoot(LoggerConfig),
  ],
})
export class AppModule {}
