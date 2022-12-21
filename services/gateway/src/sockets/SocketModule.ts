import { Module } from '@nestjs/common';
import { SocketController } from '@/sockets/SocketController';
import { SocketGateway } from '@/sockets/SocketGateway';
import { SharedModule } from '@/modules/SharedModule';

@Module({
  imports: [SharedModule],
  controllers: [SocketController],
  providers: [SocketGateway],
})
export class SocketModule {}
