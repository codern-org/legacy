import {
  Controller, Get, Request,
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
    @Response({ passthrough: true }) response: FastifyReply,
  ): Observable<void> {
    return this.fileService.stream(request.url, response);
  }

}
