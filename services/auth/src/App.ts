import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from 'logger';
import { AppModule } from '@/modules/AppModule';

const port = Number.parseInt(process.env.PORT || '3001', 10);

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    { transport: Transport.TCP, options: { host: '0.0.0.0', port } },
  );
  await app.listen();
  Logger.info(`Auth service is listening on port ${port}`);
};

bootstrap();
