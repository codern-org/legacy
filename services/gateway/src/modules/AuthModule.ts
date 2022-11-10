import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthController } from '@/controllers/AuthController';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'codern.auth',
          protoPath: 'root.proto',
          loader: {
            includeDirs: [join(__dirname, '../../../../packages/proto')],
            keepCase: true,
          },
        },
      },
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
