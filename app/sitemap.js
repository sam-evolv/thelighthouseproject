export default function sitemap() {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://thelighthouseproject.vercel.app';
  return ['', '/privacy', '/safeguarding'].map(path => ({ url: origin + path }));
}
