'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/all/Button';
import Link from 'next/link';
import { CircleDollarSignIcon, PaperclipIcon, UserIcon } from 'lucide-react';

const AdminPage = () => {
  const { data: session } = useSession();

  const handleLogin = () =>
    signIn('google', {
      callbackUrl: '/admin',
    });

  const handleLogout = () => signOut({ callbackUrl: '/' });

  const routes = [
    {
      title: 'Portfølje',
      href: '/admin/portfolio',
      icon: CircleDollarSignIcon,
    },
    {
      title: 'Medlemmer',
      href: '/admin/members',
      icon: UserIcon,
    },
    {
      title: 'Søknader',
      href: '/admin/applications',
      icon: PaperclipIcon,
    },
  ];

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

  if (session?.user?.role === 'admin') {
    return (
      <div className="flex flex-col items-center py-8 min-h-screen">
        <div className="flex flex-col items-center  px-6 gap-5">
          <h1 className="text-3xl">{`Velkommen ${session.user.name}`}</h1>

          <div className="flex flex-row gap-5 pt-4 pb-24">
            {routes.map((route, index) => (
              <div key={index}>
                <Link href={route.href} className="">
                  <div className="border-2 border-white rounded-md px-8 hover:scale-110">
                    <div className="flex flex-col items-center justify-between w-full shadow-md min-h-48 p-4">
                      <h1 className="mb-4 text-2xl font-semibold">
                        {route.title}
                      </h1>
                      <div className="flex-grow flex items-center justify-center">
                        <route.icon size={96} />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <Button
            color="orange"
            title="Logg ut"
            onClick={() => handleLogout()}
          />
        </div>
      </div>
    );
  }
};

export default AdminPage;
