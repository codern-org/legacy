import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from '@/modules/auth/AuthController';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'AUTH_SERVICE', transport: Transport.TCP, options: { port: 3001 } },
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
