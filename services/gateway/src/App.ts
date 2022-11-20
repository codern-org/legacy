import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { LoggerConfig } from 'logger';
import { WinstonModule, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import fastifyCookie from '@fastify/cookie';
import { AppModule } from '@/modules/AppModule';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: WinstonModule.createLogger(LoggerConfig),
    },
  );

  const configService = app.get(ConfigService);
  const port = configService.get('port');

  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);

  // TODO: change origin later
  app.enableCors({ origin: true, credentials: true });

  app.register(fastifyCookie);

  await app.listen(port);
  logger.log(`Gateway service is listening on port ${port}`);
};

bootstrap();
