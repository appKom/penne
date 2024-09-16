import { useSession } from 'next-auth/react';

export default function AdminPage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex items-center justify-center px-6">
          <h1 className="text-3xl">Vennligst logg inn</h1>
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
}
