import { Inter, Source_Serif_4 } from 'next/font/google';
import './globals.css';
import './experience.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-source-serif',
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://thelighthouseproject.vercel.app'),
  title: 'The Light House Project · Ballymun — The Wall of Light',
  description:
    'Some people are your light. Name a star for someone you love, share a little hope, and discover The Light House Project in Ballymun. Explore our preview sky.',
  icons: { icon: '/assets/favicon.png' },
  openGraph: {
    title: 'The Wall of Light · Ballymun',
    description:
      'For someone you love. For a community that cares. Discover a little love, written in light.',
    siteName: 'The Light House Project',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body><noscript><style>{`.reveal{opacity:1;transform:none}#giftForm,#dedicationPreview,#heroExplore,#exploreBtn,.panel-controls,.lights-field,.dock{display:none}`}</style><p className="noscript-note">Enable JavaScript to create and explore stars. You can still discover our community and <a href="mailto:lighthouseprojectballymun@gmail.com">get in touch</a>.</p></noscript>{children}</body>
    </html>
  );
}
