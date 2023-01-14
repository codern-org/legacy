import {
  Body, Controller, Post,
} from '@nestjs/common';
import { Language, Result } from '@codern/internal';
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
    @Body('submissionId') submissionId: number,
    @Body('language') language: Language,
    @Body('filePath') filePath: string,
    @Body('results') results: Result[],
    @Body('uploadedAt') uploadedAt: number,
  ): void {
    const socket = this.socketGateway.getSocketByUserId(userId);
    if (!socket) return;

    // Similar to `Submission` type
    socket.emit('submission', {
      id: submissionId,
      language,
      filePath,
      results,
      uploadedAt,
    });
  }

}
