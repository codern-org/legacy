import {
  Body, Controller, Post,
} from '@nestjs/common';
import { Language, SubmissionStatus } from '@codern/internal';
import { SocketGateway } from '@/sockets/SocketGateway';

@Controller('/socket')
export class SocketController {

  private readonly socketGateway: SocketGateway;

  public constructor(socketGateway: SocketGateway) {
    this.socketGateway = socketGateway;
  }

  // TODO: add type
  @Post('/submission/:submissionId')
  public notifySubmission(
    @Body('userId') userId: string,
    @Body('filePath') filePath: string,
    @Body('id') id: number,
    @Body('language') language: Language,
    @Body('status') status: SubmissionStatus,
    @Body('result') result: string,
    @Body('uploadedAt') uploadedAt: number,
  ): void {
    const socket = this.socketGateway.getSocketByUserId(userId);
    if (!socket) return;
    socket.emit('submission', {
      filePath,
      id,
      language,
      status,
      result,
      uploadedAt,
    });
  }

}
