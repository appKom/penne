import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/all/Navbar';
import Footer from '@/components/all/Footer';
import SessionWrapper from '@/lib/auth/SessionWrapper';
import { Analytics } from '@vercel/analytics/react';

// TODO: add favicon, and maybe dynamic title and description based on page
export const metadata: Metadata = {
  title: 'Onlinefondet',
  description:
    'Onlinefondet er en engasjert og livlig komité i linjeforeningen Online, dedikert til å fremme informatikkstudenters interesser og berike deres akademiske og sosiale opplevelser. Gjennom vårt fond, ledet av et dedikert fondstyre, gir vi økonomisk støtte til initiativer som sikrer at medlemmenes behov og interesser blir ivaretatt.',
  keywords: [
    'line',
    'fond',
    'fondet',
    'onlinefondet',
    'linjeforeningen',
    'informatikk',
    'student',
    'studentforening',
    'fondstyre',
    'styret',
    'styremedlem',
    'styre',
    'styremedlemmer',
    'styreleder',
    'nestleder',
    'økonomi',
    'økonomistyring',
    'økonomistyrer',
    'økonomistyrere',
    'økonomistyring',
    'økonomistyringer',
    'økonomistyringer',
  ],
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
        <Analytics />
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
