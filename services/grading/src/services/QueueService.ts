import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { Language } from '@codern/internal';
import { catchError, Observable, throwError } from 'rxjs';

export type FileSource = {
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
    submissionId: number,
    type: Language,
    softLimitMemory: number,
    softLimitTime: number,
    filesSource: FileSource[],
  ): Observable<void> {
    return this.client
      .emit(
        'grade',
        {
          submissionId,
          type,
          softLimitMemory,
          softLimitTime,
          filesSource,
        },
      )
      .pipe(catchError(throwError));
  }

}
