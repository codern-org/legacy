import { Module } from '@nestjs/common';
import { PrismaModule } from '@/modules/PrismaModule';
import { WorkspaceController } from '@/controllers/WorkspaceController';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [WorkspaceController],
  providers: [],
})
export class WorkspaceModule {}
