import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger as LoggerInstance } from 'logger';
import { Logger } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { join } from 'path';
import { AppModule } from '@/modules/AppModule';
import { AllExceptionFilter } from '@/utils/errors/AllExceptionFilter';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:3002',
      package: 'codern.auth',
      protoPath: 'root.proto',
      loader: {
        includeDirs: [join(__dirname, '../../../packages/proto')],
        keepCase: true,
      },
    },
    logger: WinstonModule.createLogger({ instance: LoggerInstance }),
  });

  const logger = app.get(Logger);

  app.useGlobalFilters(new AllExceptionFilter(logger));
  await app.listen();

  logger.log('Auth service is listening on 3002', 'App');
};

bootstrap();
