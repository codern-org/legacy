import {
  GetQuestionSummaryByIdRequest, GetQuestionSummaryByIdResponse,
  GetSubmissionsByQuestionIdRequest, GetSubmissionsByQuestionIdResponse, GradeRequest,
  GradeResponse, SaveCodeRequest, SubmitRequest,
  SubmitResponse,
} from '@codern/internal';
import { Observable } from 'rxjs';

export interface GradingService {

  getSubmissionsByQuestionId(
    data: GetSubmissionsByQuestionIdRequest
  ): Observable<GetSubmissionsByQuestionIdResponse>;

  saveCode(data: SaveCodeRequest): Observable<void>;

  submit(data: SubmitRequest): Observable<SubmitResponse>;

  grade(data: GradeRequest): Observable<GradeResponse>;

  getQuestionSummaryByIds(
    data: GetQuestionSummaryByIdRequest,
  ): Observable<GetQuestionSummaryByIdResponse>;

}
