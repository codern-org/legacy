import {
  Controller, Get, NotFoundException, Param, Request,
  Response,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';
import { FileService } from '@/services/FileService';

@Controller('/file')
export class FileController {

  private readonly fileService: FileService;

  public constructor(fileService: FileService) {
    this.fileService = fileService;
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
