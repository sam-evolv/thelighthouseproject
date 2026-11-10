import { createSocialImage } from '@/lib/social-image';
import { getStarById } from '@/lib/registry';

export const alt = 'A little love, written in light · The Wall of Light, Ballymun';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({ params }) {
  const { id } = await params;
  return createSocialImage(getStarById(id));
}
