import {
  GetAllWorkspacesRequest, GetAllWorkspacesResponse, GetQuestionByIdRequest,
  GetQuestionByIdResponse, GetQuestionsByWorkspaceIdRequest, GetQuestionsByWorkspaceIdResponse,
  GetWorkspaceByIdRequest, GetWorkspaceByIdResponse, IsInWorkspaceRequest,
  IsInWorkspaceResponse,
} from 'api-types/src/workspace/message';
import { Observable } from 'rxjs';

export interface WorkspaceService {

  IsInWorkspace(data: IsInWorkspaceRequest): Observable<IsInWorkspaceResponse>;

  getAllWorkspaces(data: GetAllWorkspacesRequest): Observable<GetAllWorkspacesResponse>;

  getWorkspaceById(data: GetWorkspaceByIdRequest): Observable<GetWorkspaceByIdResponse>;

  getQuestionsByWorkspaceId(
    data: GetQuestionsByWorkspaceIdRequest,
  ): Observable<GetQuestionsByWorkspaceIdResponse>;

  getQuestionById(data: GetQuestionByIdRequest): Observable<GetQuestionByIdResponse>;

}
