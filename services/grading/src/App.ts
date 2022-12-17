import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WinstonModule, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggerConfig } from 'logger';
import { join } from 'path';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '@/modules/AppModule';
import { AllExceptionFilter } from '@/utils/errors/AllExceptionFilter';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new FastifyAdapter(),
    {
      logger: WinstonModule.createLogger(LoggerConfig),
    },
  );

  const configService = app.get(ConfigService);
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  app.useLogger(logger);
  app.useGlobalFilters(new AllExceptionFilter(logger));

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:3003',
      package: 'codern.grading',
      protoPath: 'root.proto',
      loader: {
        includeDirs: [join(__dirname, '../../../packages/proto')],
        keepCase: true,
      },
    },
  });

  const amqpUrl = configService.get('amqpUrl');
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [amqpUrl],
      queue: 'grading-result',
      queueOptions: { durable: true },
    },
  });

  await app.startAllMicroservices();
  logger.log('Grading service is listening on 3003', 'App');
};

bootstrap();
