'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { CircleDollarSignIcon, PaperclipIcon, UserIcon } from 'lucide-react';

const AdminPage = () => {
  const { data: session } = useSession();

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

  return (
    <div className="flex flex-col items-center py-8 ">
      <div className="flex flex-col items-center  px-6 gap-5">
        <h1 className="text-3xl">{`Velkommen ${session?.user!.name}`}</h1>

        <div className="grid  grid-rows-5 gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </div>
  );
};

export default AdminPage;
