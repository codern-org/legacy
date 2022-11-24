import { WorkspaceService } from '@/services/WorkspaceService';
import { Controller } from '@nestjs/common';

@Controller('/workspace')
export class WorkspaceController {

  private readonly workspaceService: WorkspaceService;

  public constructor(workspaceService: WorkspaceService) {
    this.workspaceService = workspaceService;
  } 
}
