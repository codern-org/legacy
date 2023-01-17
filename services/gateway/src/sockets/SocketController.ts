import {
  Body, Controller, Post,
} from '@nestjs/common';
import { Language, Result, SubmissionWithResults } from '@codern/internal';
import { SocketGateway } from '@/sockets/SocketGateway';
import { publishSubmissions } from '@/utils/Serializer';

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

    const submission: SubmissionWithResults = {
      id: submissionId,
      questionId: 0, // TODO: remove mock
      userId,
      language,
      filePath,
      results,
      uploadedAt,
    };

    socket.emit('submission', publishSubmissions([submission])[0]);
  }

}
