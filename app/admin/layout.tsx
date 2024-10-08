'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Button from '@/components/all/Button';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, status } = useSession();

  const handleLogin = () =>
    signIn('google', {
      callbackUrl: '/admin',
    });

  const handleLogout = () => signOut({ callbackUrl: '/' });

  if (status === 'loading') {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-y-2 border-onlineyellow mb-4"></div>
          <h2 className="text-2xl font-semibold">
            Laster inn administrasjonspanel...
          </h2>
          <p className="text-slate-400 mt-2">
            Vennligst vent mens vi henter informasjonen din
          </p>
        </div>
      </div>
    );
  }

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
      <div>
        <Toaster />
        <div className="flex flex-col min-h-screen items-center">
          {children}
        </div>
      </div>
    );
  }
}
