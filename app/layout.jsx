import { Inter, Source_Serif_4 } from 'next/font/google';
import './globals.css';

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thelighthouseprojectfoundation.com'),
  title: 'The Light House Project · Ballymun — The Wall of Light',
  description:
    'Name a star for someone you love and it joins the night sky over Ballymun. Numbered, written with your message, and lit forever in support of The Light House Project.',
  icons: { icon: '/assets/logo-mark.png' },
  openGraph: {
    title: 'The Wall of Light · Ballymun',
    description:
      'Name a star for someone you love and it joins the night sky over Ballymun. Every light burns forever.',
    siteName: 'The Light House Project',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
