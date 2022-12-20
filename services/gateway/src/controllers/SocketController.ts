import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({ cors: '*' })
export class SockerController {

  @SubscribeMessage('test')
  public handleTest(@MessageBody() data: any): string {
    console.log(data);
    return 'ack';
  }

}
