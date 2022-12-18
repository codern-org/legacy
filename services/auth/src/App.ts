import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WinstonModule, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggerConfig } from 'logger';
import { join } from 'path';
import { AppModule } from '@/modules/AppModule';
import { AllExceptionFilter } from '@/utils/errors/AllExceptionFilter';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:3001',
      package: 'codern.auth',
      protoPath: 'root.proto',
      loader: {
        includeDirs: [
          (process.env.NODE_ENV === 'production')
            ? join(process.cwd(), 'proto')
            : join(__dirname, '../../../packages/proto'),
        ],
        keepCase: true,
      },
    },
    logger: WinstonModule.createLogger(LoggerConfig),
  });

  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);

  app.useGlobalFilters(new AllExceptionFilter(logger));

  await app.listen();
  logger.log('Auth service is listening on 3001', 'App');
};

bootstrap();
