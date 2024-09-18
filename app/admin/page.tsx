'use client';

import { useSession, signIn } from 'next-auth/react';
import { Button } from '@/components/all/Button';

const AdminPage = () => {
  const { data: session } = useSession();

  const handleLogin = () => signIn('auth0');

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
    return (
      <div className="flex flex-col px-6">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl">Du har ikke tilgang til denne siden</h1>
        </div>
      </div>
    );
  }
};

export default AdminPage;
