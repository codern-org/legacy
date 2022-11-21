import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger as LoggerInstance } from 'logger';
import { WinstonModule } from 'nest-winston';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fastifyCookie from '@fastify/cookie';
import { AppModule } from '@/modules/AppModule';
import { AllExceptionFilter } from '@/utils/AllExceptionFilter';

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
  const logger = app.get(Logger);

  // TODO: change origin later
  app.enableCors({ origin: true, credentials: true });
  app.useGlobalFilters(new AllExceptionFilter(logger));
  await app.register(fastifyCookie);
  await app.listen(port);

  logger.log(`Gateway service is listening on port ${port}`);
};

bootstrap();
