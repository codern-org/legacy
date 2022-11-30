import {
  GetAllWorkspacesByUserIdRequest, GetAllWorkspacesByUserIdResponse, GetQuestionByIdRequest,
  GetQuestionByIdResponse, GetQuestionsByWorkspaceIdRequest, GetQuestionsByWorkspaceIdResponse,
  GetWorkspaceByIdRequest, GetWorkspaceByIdResponse, ValidateQuestionInWorkspaceRequest,
  ValidateUserInWorkspaceRequest,
} from '@codern/internal';
import { Observable } from 'rxjs';

export interface WorkspaceService {

  validateUserInWorkspace(data: ValidateUserInWorkspaceRequest): Observable<void>;

  validateQuestionInWorkspace(data: ValidateQuestionInWorkspaceRequest): Observable<void>;

  getAllWorkspacesByUserId(
    data: GetAllWorkspacesByUserIdRequest
  ): Observable<GetAllWorkspacesByUserIdResponse>;

  getWorkspaceById(data: GetWorkspaceByIdRequest): Observable<GetWorkspaceByIdResponse>;

  getQuestionsByWorkspaceId(
    data: GetQuestionsByWorkspaceIdRequest,
  ): Observable<GetQuestionsByWorkspaceIdResponse>;

  getQuestionById(data: GetQuestionByIdRequest): Observable<GetQuestionByIdResponse>;

}
