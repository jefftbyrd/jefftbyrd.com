import '../styles/index.css';
import { absoluteUrl } from '@/lib/utils';
import { Metadata } from 'next';
import { Hanken_Grotesk, Space_Grotesk } from 'next/font/google';
import localFont from 'next/font/local';

// import { Hanken+Grotesk } from 'next/font/google';

// const chivo = Chivo({ subsets: ['latin'], display: 'swap' });

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
});

const space = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
});

const karrik = localFont({
  src: './fonts/Karrik-Regular.woff2',
  variable: '--font-karrik',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://outstatic.com'),
  title: {
    default: 'Outstatic',
    template: '%s | Outstatic',
  },
  description: 'A blog starter built with Outstatic.',
  openGraph: {
    title: 'Outstatic - A Static Site CMS for Next.js',
    description: 'A blog starter built with Outstatic.',
    url: absoluteUrl('/'),
    siteName: 'Next.js',
    images: [
      {
        url: absoluteUrl('/images/og-image.png'),
        width: 1800,
        height: 1600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: [{ url: '/favicon/favicon-32x32.png' }],
    apple: [{ url: '/favicon/apple-touch-icon.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${karrik.variable} ${space.variable} ${hanken.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
