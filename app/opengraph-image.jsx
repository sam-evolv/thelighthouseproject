import { createSocialImage } from '@/lib/social-image';
export const alt = 'Some people are your light · The Wall of Light, Ballymun';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default async function OgImage() { return createSocialImage(); }
