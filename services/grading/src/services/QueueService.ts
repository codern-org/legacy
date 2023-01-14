import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { Language } from '@codern/internal';
import { catchError, Observable, throwError } from 'rxjs';

export type GradingFile = {
  name: string,
  sourceType: string,
  source: string,
};

@Injectable()
export class QueueSerivce {

  private readonly client: ClientRMQ;

  public constructor(@Inject('MESSAGE_BROKER') client: ClientRMQ) {
    this.client = client;
  }

  public grade(
    id: number,
    type: Language,
    softLimitMemory: number,
    softLimitTime: number,
    files: GradingFile[],
  ): Observable<void> {
    return this.client
      .emit('grade', {
        id,
        type,
        softLimitMemory,
        softLimitTime,
        files,
      })
      .pipe(catchError(throwError));
  }

}
