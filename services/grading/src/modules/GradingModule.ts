import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ClientProvider, ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '@/modules/PrismaModule';
import { GradingController } from '@/controllers/GradingController';
import { SubmissionRepository } from '@/repositories/SubmissionRepository';
import { GradingService } from '@/services/GradingService';
import { QueueSerivce } from '@/services/QueueService';
import { TestcaseRepository } from '@/repositories/TestcaseRepository';

@Module({
  imports: [
    HttpModule,
    PrismaModule,

    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: 'MESSAGE_BROKER',
        useFactory: async (configService: ConfigService): Promise<ClientProvider> => {
          const url = configService.get('amqpUrl');
          return {
            transport: Transport.RMQ,
            options: {
              urls: [url],
              queue: 'grading',
              queueOptions: { durable: true },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [GradingController],
  providers: [
    SubmissionRepository,
    TestcaseRepository,

    QueueSerivce,
    GradingService,
  ],
})
export class GradingModule {}
