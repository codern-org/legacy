import { Module } from '@nestjs/common';
import { SharedModule } from '@/modules/SharedModule';
import { WorkspaceController } from '@/controllers/WorkspaceController';

@Module({
  imports: [SharedModule],
  controllers: [WorkspaceController],
})
export class WorkspaceModule {}
