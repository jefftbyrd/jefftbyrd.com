import '../styles/index.css';
// import { absoluteUrl } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import localFont from 'next/font/local';

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
  description: 'Jeff T Byrd - Web Developer, Composer & Sound Designer',
  openGraph: {
    title: 'Jeff T Byrd',
    description: 'Web Developer, Composer & Sound Designer',
    url: '/',
    siteName: 'Jeff T Byrd',
    images: [
      {
        url: '/images/jefftbyrd.png',
        width: 1200,
        height: 630,
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
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
