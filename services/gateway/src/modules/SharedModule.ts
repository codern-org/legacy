import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProvider, ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: 'AUTH_PACKAGE',
        useFactory: async (configService: ConfigService): Promise<ClientProvider> => {
          const url = configService.get('serviceAuthUrl');
          return {
            transport: Transport.GRPC,
            options: {
              url,
              package: 'codern.auth',
              protoPath: 'root.proto',
              loader: {
                includeDirs: [
                  (process.env.NODE_ENV === 'production')
                    ? join(process.cwd(), 'proto')
                    : join(__dirname, '../../../../packages/proto'),
                ],
                keepCase: true,
                arrays: true,
                longs: Number,
              },
            },
          };
        },
        inject: [ConfigService],
      },
      {
        imports: [ConfigModule],
        name: 'WORKSPACE_PACKAGE',
        useFactory: async (configService: ConfigService): Promise<ClientProvider> => {
          const url = configService.get('serviceWorkspaceUrl');
          return {
            transport: Transport.GRPC,
            options: {
              url,
              package: 'codern.workspace',
              protoPath: 'root.proto',
              loader: {
                includeDirs: [
                  (process.env.NODE_ENV === 'production')
                    ? join(process.cwd(), 'proto')
                    : join(__dirname, '../../../../packages/proto'),
                ],
                keepCase: true,
                arrays: true,
                longs: Number,
              },
            },
          };
        },
        inject: [ConfigService],
      },
      {
        imports: [ConfigModule],
        name: 'GRADING_PACKAGE',
        useFactory: async (configService: ConfigService): Promise<ClientProvider> => {
          const url = configService.get('serviceGradingUrl');
          return {
            transport: Transport.GRPC,
            options: {
              url,
              package: 'codern.grading',
              protoPath: 'root.proto',
              loader: {
                includeDirs: [
                  (process.env.NODE_ENV === 'production')
                    ? join(process.cwd(), 'proto')
                    : join(__dirname, '../../../../packages/proto'),
                ],
                keepCase: true,
                arrays: true,
                longs: Number,
              },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  exports: [
    ClientsModule,
  ],
})
export class SharedModule { }
