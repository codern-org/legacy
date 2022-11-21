import {
  Controller, Inject, Param,
  Post, UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { MultipartFile } from '@fastify/multipart';
import { firstValueFrom } from 'rxjs';
import { GradeResponse } from 'api-types';
import { FileService } from '@/services/FileService';
import { GradingService } from '@/services/GradingService';
import { AuthGuard, UserData } from '@/utils/guards/AuthGuard';
import { FileGuard } from '@/utils/guards/FileGuard';
import { User } from '@/utils/decorators/AuthDecorator';
import { File } from '@/utils/decorators/FileDecorator';
import { GradeParams } from '@/utils/dtos/GradingDtos';

@Controller('/grade')
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

  @Post('/:questionId/:language')
  @UseGuards(FileGuard)
  @UseGuards(AuthGuard)
  public async grade(
    @File() file: MultipartFile,
    @User() user: UserData,
    @Param() params: GradeParams,
  ): Promise<GradeResponse> {
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
