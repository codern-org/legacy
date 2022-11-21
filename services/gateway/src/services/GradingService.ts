import {
  GetSubmissionsRequest, GetSubmissionsResponse, GradeRequest,
  GradeResponse, SaveCodeRequest, SubmitRequest,
  SubmitResponse,
} from 'api-types';
import { Observable } from 'rxjs';

export interface GradingService {

  getSubmission(data: GetSubmissionsRequest): Observable<GetSubmissionsResponse>;

  saveCode(data: SaveCodeRequest): Observable<void>;

  submit(data: SubmitRequest): Observable<SubmitResponse>;

  grade(data: GradeRequest): Observable<GradeResponse>;

}
