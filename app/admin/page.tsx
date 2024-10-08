'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { CircleDollarSignIcon, Users, FileText } from 'lucide-react';

interface IRoute {
  title: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  description: string;
}

const AdminPage = () => {
  const { data: session } = useSession();

  const routes: IRoute[] = [
    {
      title: 'Portfølje',
      href: '/admin/portfolio',
      icon: CircleDollarSignIcon,
      description: 'Se og rediger fondporteføljen',
    },
    {
      title: 'Medlemmer',
      href: '/admin/members',
      icon: Users,
      description: 'Rediger informasjon om nåverende og tidligere medlemmer',
    },
    {
      title: 'Søknader',
      href: '/admin/applications',
      icon: FileText,
      description:
        'Legg og rediger søknader som skal vises offentlig på nettsiden',
    },
  ];

  return (
    <div className="flex flex-col items-center py-8 ">
      <main className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 pt-10 pb-24 lg:pt-16">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
            Velkommen {session?.user!.name}
          </h1>
          <p className="text-xl text-slate-400">
            Administrasjonspanel for Onlinefondet
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {routes.map((item) => (
            <RouteCard key={item.title} {...item} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;

const RouteCard = (item: IRoute) => (
  <Link
    key={item.title}
    href={item.href}
    className="group relative rounded-xl border border-slate-800 p-6 hover:bg-slate-800/50"
  >
    <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.slate.800)),var(--quick-links-hover-bg,theme(colors.slate.800)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 transition" />
    <div className="relative flex items-center">
      <item.icon className="w-8 h-8 text-sky-500 mr-4" />
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">{item.title}</h2>
        <p className="text-sm text-slate-400">{item.description}</p>
      </div>
    </div>
  </Link>
);
