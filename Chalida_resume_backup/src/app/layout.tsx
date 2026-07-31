import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Patiwat Meekaeo — IT Manager & System Administrator',
  description: 'Resume of Patiwat Meekaeo, experienced IT Manager with expertise in system administration, network infrastructure, and technology project management.',
  keywords: ['IT Manager', 'System Administrator', 'Network', 'Infrastructure', 'Thailand'],
  openGraph: {
    title: 'Patiwat Meekaeo — IT Manager',
    description: 'Experienced IT Manager | System Administrator | Bangkok, Thailand',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+Thai:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
