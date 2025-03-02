import '../styles/index.css';
import { absoluteUrl } from '@/lib/utils';
import { Metadata } from 'next';
import { Hanken_Grotesk, Space_Grotesk } from 'next/font/google';
import localFont from 'next/font/local';

// const hanken = Hanken_Grotesk({
//   subsets: ['latin'],
//   variable: '--font-hanken',
// });

const space = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
});

const karrik = localFont({
  src: './fonts/Karrik-Regular.woff2',
  variable: '--font-karrik',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jefftbyrd.com'),
  title: {
    default: 'Jeff T Byrd',
    template: '%s | Jeff T Byrd',
  },
  description: 'A blog starter built with Outstatic.',
  openGraph: {
    title: 'Jeff T Byrd - Web Developer, Composer & Sound Designer',
    description: 'A portfolio site.',
    url: absoluteUrl('/'),
    siteName: 'Jeff T Byrd',
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
      className={`${karrik.variable} ${space.variable} text-[15px] sm:text-[20px]`}
    >
      <body>{children}</body>
    </html>
  );
}
