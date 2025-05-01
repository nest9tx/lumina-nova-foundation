import { notFound } from 'next/navigation';
import { canAccessTier } from '@/utils/tierAccess';
import { loadScroll } from '@/lib/loadScroll';

export default async function ScrollPage({ params }: { params: { vault: string; scroll: string } }) {
  const { vault, scroll } = params;

  const scrollData = loadScroll(vault, scroll);
  if (!scrollData) return notFound();

  const userTier = 'seeker'; // TEMP: Replace with getUserTier() soon
  const requiredTier = scrollData.frontmatter.tier || 'seeker';
  const accessGranted = canAccessTier(userTier, requiredTier);

  if (!accessGranted) return notFound();

  return (
    <div className="prose mx-auto">
      <h1>{scrollData.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: scrollData.contentHtml }} />
    </div>
  );
}

