import { WorkspaceCard } from '@/features/dashboard/workspace/WorkspaceCard';

export const WorkspaceDeck = () => {
  return (
    <div className="overflow-y-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <WorkspaceCard
        title="Bangmod Hackathon"
        creator="KMUTT"
        progress={10}
        participants={10}
        special
      />

      {Array(20).fill(1).map((_, i) => (
        <WorkspaceCard
          key={i}
          title={`Mock up ${Math.floor(Math.random() * 101)}`}
          creator="Vectier"
          participants={Math.floor(Math.random() * 7) + 1}
          progress={Math.floor(Math.random() * 101)}
        />
      ))}
    </div>
  );
};
