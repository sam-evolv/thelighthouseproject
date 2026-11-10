import Site from '@/components/Site';
import { getStarById, displayName, starName, regionPhrase } from '@/lib/registry';
import { notFound } from 'next/navigation';

// The gift link: server-rendered per star so WhatsApp/iMessage previews look
// like the gift, then the client engine plays the arrival experience.
export async function generateMetadata({ params }) {
  const { id } = await params;
  const star = getStarById(id);
  if (!star) {
    return {
      title: 'A light for you · The Wall of Light',
      description: 'A star has been named for you on the Wall of Light over Ballymun.',
    };
  }
  const nm = starName(star);
  const title = nm
    ? `A little light for ${nm} · The Wall of Light`
    : `${displayName(star)}’s light · The Wall of Light`;
  const description = `“${star.msg}” — A preview gift from ${star.name}, shining in ${regionPhrase(star)}. A little love, written in light.`;
  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: 'summary_large_image', title, description },
    robots: { index: false, follow: false },
  };
}

export default async function StarPage({ params }) {
  const { id } = await params;
  if (!getStarById(id)) notFound();
  return <Site starId={id} />;
}
