import { WorkspaceCard } from '@/features/dashboard/content/workspace/WorkspaceCard';

export const WorkspaceDeck = () => {
  return (
    <div className="overflow-y-scroll grid grid-cols-4 gap-4">
      <WorkspaceCard />
      <WorkspaceCard />
      <WorkspaceCard />
      <WorkspaceCard />
      
      <WorkspaceCard />
      <WorkspaceCard />
      <WorkspaceCard />
      <WorkspaceCard />

      <WorkspaceCard />
      <WorkspaceCard />
      <WorkspaceCard />
      <WorkspaceCard />
    </div>
  );
};
