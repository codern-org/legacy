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
import { ResultRepository } from '@/repositories/ResultRepository';
import { QuestionRepository } from '@/repositories/QuestionRepository';

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
              queue: 'grading-grade',
              queueOptions: { durable: true },
              serializer: {
                serialize(value): unknown {
                  return value.data;
                },
              },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [GradingController],
  providers: [
    ResultRepository,
    SubmissionRepository,
    TestcaseRepository,
    QuestionRepository,

    QueueSerivce,
    GradingService,
  ],
})
export class GradingModule {}
