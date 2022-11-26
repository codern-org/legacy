import {
  GetAllWorkspacesByUserIdRequest, GetAllWorkspacesByUserIdResponse, GetQuestionByIdRequest,
  GetQuestionByIdResponse, GetQuestionsByWorkspaceIdRequest, GetQuestionsByWorkspaceIdResponse,
  GetWorkspaceByIdRequest, GetWorkspaceByIdResponse, IsInWorkspaceRequest,
  IsInWorkspaceResponse, IsQuestionInWorkspaceRequest, IsQuestionInWorkspaceResponse,
} from 'api-types';
import { Observable } from 'rxjs';

export interface WorkspaceService {

  isInWorkspace(data: IsInWorkspaceRequest): Observable<IsInWorkspaceResponse>;

  isQuestionInWorkspace(
    data: IsQuestionInWorkspaceRequest
  ): Observable<IsQuestionInWorkspaceResponse>;

  getAllWorkspacesByUserId(
    data: GetAllWorkspacesByUserIdRequest
  ): Observable<GetAllWorkspacesByUserIdResponse>;

  getWorkspaceById(data: GetWorkspaceByIdRequest): Observable<GetWorkspaceByIdResponse>;

  getQuestionsByWorkspaceId(
    data: GetQuestionsByWorkspaceIdRequest,
  ): Observable<GetQuestionsByWorkspaceIdResponse>;

  getQuestionById(data: GetQuestionByIdRequest): Observable<GetQuestionByIdResponse>;

}
