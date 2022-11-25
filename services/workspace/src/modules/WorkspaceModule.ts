import { Module } from '@nestjs/common';
import { PrismaModule } from '@/modules/PrismaModule';
import { WorkspaceController } from '@/controllers/WorkspaceController';
import { QuestionRepository } from '@/repositories/QuestionRepository';
import { WorkspaceRepository } from '@/repositories/WorkspaceRepository';
import { WorkspaceService } from '@/services/WorkspaceService';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [WorkspaceController],
  providers: [
    QuestionRepository,
    WorkspaceRepository,

    WorkspaceService,
  ],
})
export class WorkspaceModule {}
