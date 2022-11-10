import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger as LoggerInstance } from 'logger';
import { Logger } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '@/modules/AppModule';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'codern.auth',
      protoPath: 'root.proto',
      loader: {
        includeDirs: [join(__dirname, '../../../packages/proto')],
        keepCase: true,
      },
    },
    logger: WinstonModule.createLogger({ instance: LoggerInstance }),
  });

  const configService = app.get(ConfigService);

  await app.listen();
  Logger.log(`Auth service is listening on ${configService.get('port')}`, 'App');
};

bootstrap();
