import {
  CreateGradingQuestionRequest,
  CreateGradingQuestionResponse,
  GetQuestionSummaryByIdsRequest, GetQuestionSummaryByIdsResponse,
  GetRankingResponse,
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
    data: GetQuestionSummaryByIdsRequest,
  ): Observable<GetQuestionSummaryByIdsResponse>;

  getRanking(any: unknown): Observable<GetRankingResponse>;

  createGradingQuestion(
    data: CreateGradingQuestionRequest,
  ): Observable<CreateGradingQuestionResponse>;

}
