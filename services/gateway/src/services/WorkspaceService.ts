import {
  GetAllWorkspacesByUserIdRequest, GetAllWorkspacesByUserIdResponse, GetQuestionByIdRequest,
  GetQuestionByIdResponse, GetQuestionsByWorkspaceIdRequest, GetQuestionsByWorkspaceIdResponse,
  GetWorkspaceByIdRequest, GetWorkspaceByIdResponse, IsInWorkspaceRequest,
  IsInWorkspaceResponse,
} from 'api-types/src/workspace/message';
import { Observable } from 'rxjs';

export interface WorkspaceService {

  IsInWorkspace(data: IsInWorkspaceRequest): Observable<IsInWorkspaceResponse>;

  getAllWorkspacesByUserId(
    data: GetAllWorkspacesByUserIdRequest
  ): Observable<GetAllWorkspacesByUserIdResponse>;

  getWorkspaceById(data: GetWorkspaceByIdRequest): Observable<GetWorkspaceByIdResponse>;

  getQuestionsByWorkspaceId(
    data: GetQuestionsByWorkspaceIdRequest,
  ): Observable<GetQuestionsByWorkspaceIdResponse>;

  getQuestionById(data: GetQuestionByIdRequest): Observable<GetQuestionByIdResponse>;

}
