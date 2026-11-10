export default function robots() {
  return { rules: { userAgent: '*', allow: '/', disallow: '/star/' }, sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thelighthouseproject.vercel.app'}/sitemap.xml` };
}
