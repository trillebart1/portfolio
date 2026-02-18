import { getProjects } from '@/lib/projects';
import CinematicGrid from '@/components/CinematicGrid';

export const revalidate = 60;

export default async function Home() {
  const projects = await getProjects();
  const visibleProjects = projects.filter(p => !p.hidden);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <CinematicGrid projects={visibleProjects} />
    </main>
  );
}
