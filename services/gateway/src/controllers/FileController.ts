import {
  Controller, Get, NotFoundException, Param, Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';
import { FileService } from '@/services/FileService';
import { AuthGuard } from '@/utils/guards/AuthGuard';
import { WorkspaceGuard } from '@/utils/guards/WorkspaceGuard';

@Controller('/file')
export class FileController {

  private readonly fileService: FileService;

  public constructor(fileService: FileService) {
    this.fileService = fileService;
  }

  @Get('/workspaces/:workspaceId/questions/:questionId')
  @UseGuards(AuthGuard, WorkspaceGuard)
  public getQuestionDetail(
    @Request() request: FastifyRequest,
    @Param('questionId') questionId: string,
    @Response({ passthrough: true }) response: FastifyReply,
  ): Observable<void> {
    if (!questionId) throw new NotFoundException();
    return this.fileService.stream(request.url, response);
  }

  @Get('/profile/:userId')
  public getUserProfileImage(
    @Request() request: FastifyRequest,
    @Param('userId') userId: string,
    @Response({ passthrough: true }) response: FastifyReply,
  ): Observable<void> {
    if (!userId) throw new NotFoundException();
    return this.fileService.stream(request.url, response);
  }

}
