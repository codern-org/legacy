import {
  Controller, ForbiddenException, Get, Inject, Param,
  Post, UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { MultipartFile } from '@fastify/multipart';
import { firstValueFrom, map, Observable } from 'rxjs';
import { PublicSubmission, PublicUser, PublicRank } from '@codern/external';
import { FileService } from '@/services/FileService';
import { GradingService } from '@/services/GradingService';
import { AuthGuard } from '@/utils/guards/AuthGuard';
import { FileGuard } from '@/utils/guards/FileGuard';
import { User } from '@/utils/decorators/AuthDecorator';
import { File } from '@/utils/decorators/FileDecorator';
import { GradeParams } from '@/utils/dtos/GradingDtos';
import { WorkspaceGuard } from '@/utils/guards/WorkspaceGuard';
import { publishSubmissions } from '@/utils/Serializer';

@Controller('/workspaces')
export class GradingController {

  private readonly gradingService: GradingService;
  private readonly fileService: FileService;

  public constructor(
    fileService: FileService,
    @Inject('GRADING_PACKAGE') client: ClientGrpc,
  ) {
    this.fileService = fileService;
    this.gradingService = client.getService('GradingService');
  }

  @Post('/:workspaceId/questions/:questionId/grade/:language')
  @UseGuards(AuthGuard, FileGuard, WorkspaceGuard)
  public async grade(
    @File() file: MultipartFile,
    @User() user: PublicUser,
    @Param() params: GradeParams,
  ): Promise<PublicSubmission> {
    const { questionId, language } = params;
    const { submissionId, filePath } = await firstValueFrom(
      this.gradingService.submit({
        userId: user.id,
        questionId,
        language,
      }),
    );
    await this.fileService.upload(file, filePath);
    const submission = await firstValueFrom(this.gradingService.grade({ submissionId }));
    return publishSubmissions([submission])[0];
  }

  @Get('/:workspaceId/questions/:questionId/submissions')
  @UseGuards(AuthGuard, WorkspaceGuard)
  public getSubmissionsByQuestionId(
    @User() user: PublicUser,
    @Param('questionId') questionId: number,
  ): Observable<PublicSubmission[]> {
    const userId = user.id;
    return this.gradingService
      .getSubmissionsByQuestionId({ userId, questionId })
      .pipe(map((response) => publishSubmissions(response.submissions)));
  }

  // TODO: hardcoded for BMH2023
  @Get('/ranking')
  @UseGuards(AuthGuard)
  public getRanking(
    @User() user: PublicUser,
  ): Observable<PublicRank[]> {
    const userId = user.id;
    if (userId !== '1') throw new ForbiddenException();
    return this.gradingService
      .getRanking({})
      .pipe(map((response) => response.ranks));
  }

}
