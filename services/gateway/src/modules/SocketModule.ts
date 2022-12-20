import { Module } from '@nestjs/common';
import { SockerController } from '@/controllers/SocketController';

@Module({
  providers: [SockerController],
})
export class SocketModule {}
