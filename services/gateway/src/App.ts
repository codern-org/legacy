import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger } from 'logger';
import { AppModule } from '@/modules/AppModule';

const port = Number.parseInt(process.env.PORT || '3000', 10);

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.listen(port);
  Logger.info(`Gateway service is listening on port ${port}`);
};

bootstrap();
