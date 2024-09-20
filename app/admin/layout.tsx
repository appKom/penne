'use client';
import Navbar from '@/components/all/Navbar';
import Footer from '@/components/all/Footer';
import SessionWrapper from '@/lib/auth/sessionProvider';
import { signIn, signOut, useSession } from 'next-auth/react';
import Button from '@/components/all/Button';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession();

  const handleLogin = () =>
    signIn('google', {
      callbackUrl: '/admin',
    });

  const handleLogout = () => signOut({ callbackUrl: '/' });

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center px-6 gap-5">
          <h1 className="text-3xl">Vennligst logg inn</h1>
          <Button
            color="orange"
            title="Logg inn"
            onClick={() => handleLogin()}
          />
        </div>
      </div>
    );
  }

  if (session?.user?.role !== 'admin') {
    console.log(session.user);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center px-6 gap-5">
          <h1 className="text-3xl">Du har ikke tilgang til denne siden</h1>
          <h1>{session.user?.name}</h1>
          <Button
            color="orange"
            title="Logg ut"
            onClick={() => handleLogout()}
          />
        </div>
      </div>
    );
  }
  if (session && session?.user?.role === 'admin') {
    return (
      <html lang="nb">
        <head>
          <link rel="icon" href="public/icon-256.png" sizes="any" />
        </head>
        <SessionWrapper>
          <body className="antialiased">
            <Navbar />
            <div className="flex flex-col min-h-screen items-center">
              {children}
              <div className="w-full max-w-lg  text-center">
                <Button
                  color="orange"
                  title="Logg ut"
                  onClick={() => handleLogout()}
                />
              </div>
            </div>
            <Footer />
          </body>
        </SessionWrapper>
      </html>
    );
  }
}
