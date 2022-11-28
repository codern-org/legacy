import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:3001',
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
      },
      {
        name: 'WORKSPACE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:3002',
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
      },
      {
        name: 'GRADING_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:3003',
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
      },
    ]),
  ],
  exports: [
    ClientsModule,
  ],
})
export class SharedModule {}
