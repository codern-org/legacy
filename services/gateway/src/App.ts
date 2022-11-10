import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger as LoggerInstance } from 'logger';
import { WinstonModule } from 'nest-winston';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '@/modules/AppModule';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: WinstonModule.createLogger({ instance: LoggerInstance }),
    },
  );

  const configService = app.get(ConfigService);
  const port = configService.get('port');

  await app.listen(port);
  Logger.log(`Gateway service is listening on port ${port}`);
};

bootstrap();
