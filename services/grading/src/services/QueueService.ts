import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { Language } from '@codern-api/internal';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class QueueSerivce {

  private readonly client: ClientRMQ;

  public constructor(@Inject('MESSAGE_BROKER') client: ClientRMQ) {
    this.client = client;
  }

  public grade(submissionId: number, language: Language, testcasePath: string): Observable<void> {
    return this.client
      .emit('grade', { submissionId, language, testcasePath })
      .pipe(catchError(throwError));
  }

}
