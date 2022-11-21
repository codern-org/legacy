import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { configuration } from '@/utils/Configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),

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
          },
        },
      },
    ]),
  ],
  providers: [
    Logger,
  ],
  exports: [
    ConfigModule,
    ClientsModule,
    Logger,
  ],
})
export class SharedModule {}
