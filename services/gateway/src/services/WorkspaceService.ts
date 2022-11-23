import {
  GetAllWorkspacesRequest, GetAllWorkspacesResponse, GetQuestionByIdRequest,
  GetQuestionByIdResponse, GetQuestionsByWorkspaceIdRequest, GetQuestionsByWorkspaceIdResponse,
  GetWorkspaceByIdRequest, GetWorkspaceByIdResponse,
} from 'api-types/src/workspace/message';
import { Observable } from 'rxjs';

export interface WorkspaceService {

  getAllWorkspaces(data: GetAllWorkspacesRequest): Observable<GetAllWorkspacesResponse>;

  getWorkspaceById(data: GetWorkspaceByIdRequest): Observable<GetWorkspaceByIdResponse>;

  getQuestionsByWorkspaceId(
    data: GetQuestionsByWorkspaceIdRequest,
  ): Observable<GetQuestionsByWorkspaceIdResponse>;

  getQuestionById(data: GetQuestionByIdRequest): Observable<GetQuestionByIdResponse>;

}
