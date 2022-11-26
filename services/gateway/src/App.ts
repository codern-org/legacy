import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { LoggerConfig } from 'logger';
import { WinstonModule, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fastifyCookie from '@fastify/cookie';
import fastifyMultipart from '@fastify/multipart';
import { AppModule } from '@/modules/AppModule';
import { AllExceptionFilter } from '@/utils/AllExceptionFilter';

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

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new AllExceptionFilter(logger));

  app.register(fastifyMultipart);
  app.register(fastifyCookie);

  await app.listen(port);
  logger.log(`Gateway service is listening on port ${port}`);
};

bootstrap();
