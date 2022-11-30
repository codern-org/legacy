import {
  Controller, Inject, Param,
  Post, UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { MultipartFile } from '@fastify/multipart';
import { firstValueFrom } from 'rxjs';
import { PublicGradeResponse, PublicUser } from '@codern/external';
import { FileService } from '@/services/FileService';
import { GradingService } from '@/services/GradingService';
import { AuthGuard } from '@/utils/guards/AuthGuard';
import { FileGuard } from '@/utils/guards/FileGuard';
import { User } from '@/utils/decorators/AuthDecorator';
import { File } from '@/utils/decorators/FileDecorator';
import { GradeParams } from '@/utils/dtos/GradingDtos';
import { WorkspaceGuard } from '@/utils/guards/WorkspaceGuard';

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
  ): Promise<PublicGradeResponse> {
    const { questionId, language } = params;

    const { submissionId, filePath } = await firstValueFrom(this.gradingService.submit({
      userId: user.id,
      questionId,
      language,
    }));
    await this.fileService.upload(file, filePath);
    return firstValueFrom(this.gradingService.grade({ submissionId }));
  }

}
