import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/all/Navbar';
import Footer from '@/components/all/Footer';
import SessionWrapper from '@/lib/auth/SessionWrapper';

// TODO: add favicon, and maybe dynamic title and description based on page
export const metadata: Metadata = {
  title: 'Onlinefondet',
  description: 'TODO: Add description',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb">
      <head>
        <link rel="icon" href="public/icon-256.png" sizes="any" />
      </head>
      <body className="antialiased">
        <SessionWrapper>
          <Navbar />
          {children}
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
