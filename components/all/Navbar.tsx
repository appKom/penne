'use client';

import { useState, useEffect, useRef } from 'react';
import { Spiral as Hamburger } from 'hamburger-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Button from './Button';
import { Session } from 'next-auth';
import Image from 'next/image';

const navLinks = [
  { title: 'Fondet', path: '/' },
  { title: 'Styret', path: '/styret' },
  { title: 'Søknad', path: '/soknad' },
  { title: 'Vedtekter', path: '/vedtekter' },
];

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScroll = useRef(0);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    const controlNavbar = () => {
      const currentScroll = window.scrollY;

      if (currentScroll <= 0) {
        setShowNavbar(true);
      } else if (currentScroll > lastScroll.current) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScroll.current = currentScroll;
    };

    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, []);

  useEffect(() => {
    // Scroll to top when location changes
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleLogout = () => signOut({ callbackUrl: '/admin' });

  return (
    <div
      className={clsx(
        showNavbar ? 'opacity-100' : 'opacity-0 pointer-events-none',
        'bg-gray-950/80 backdrop-blur top-0 sticky w-full transition z-20 flex items-center justify-between px-4 py-2 md:py-5 md:px-8 border-b border-[#293046] shadow-md',
      )}
    >
      <MobileNavbar />
      <DesktopNavbar session={session} handleLogout={handleLogout} />
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const [showNavMenu, setShowNavMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowNavMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between w-full lg:hidden">
      <Link
        href="/"
        className="p-2 text-2xl font-bold transition hover:opacity-50"
      >
        Onlinefondet
      </Link>

      {/* HAMBURGER MENU */}
      <div ref={dropdownRef}>
        <Hamburger toggled={showNavMenu} toggle={setShowNavMenu} />
        {showNavMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#131620] border-y border-[#293046] divide-y divide-[#293046]"
          >
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.path}
                className="block py-2 px-4 hover:bg-[#1e2334] transition text-lg"
                onClick={() => setShowNavMenu(false)}
              >
                {link.title}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

interface DesktopNavbarProps {
  session: Session | null;
  handleLogout: () => void;
}

const DesktopNavbar = ({ session, handleLogout }: DesktopNavbarProps) => {
  const [showPenne, setShowPenne] = useState(false);

  useEffect(() => {
    setShowPenne(Math.random() <= 0.05);
  }, []);

  return (
    <div className="items-center justify-between hidden w-full lg:flex">
      <Link
        href="/"
        className="p-2 text-2xl font-bold transition hover:opacity-50"
      >
        Onlinefondet
      </Link>

      {/* NAV-ITEMS */}
      <div className="absolute left-0 right-0 flex justify-center w-max gap-8 m-auto mx-auto transform -translate-y-1/2 top-1/2">
        {navLinks.map((link) => (
          <Link
            href={link.path}
            className="px-4 py-2 transition hover:bg-[#1e2334] text-lg rounded-md border hover:border hover:border-[#293046] border-transparent tracking-wide"
            key={link.title}
          >
            {link.title}
          </Link>
        ))}
      </div>

      <div className="flex flex-row gap-5 items-center">
        {session?.user?.role === 'admin' && (
          <div className="flex flex-row gap-4 items-center">
            <p className="text-gray-300 text-lg hidden xl:flex">
              {session.user.name}
            </p>
            <Button href="/admin" title="Admin" color="white" />
            <Button
              title="Logg ut"
              onClick={() => handleLogout()}
              color="orange"
            />
          </div>
        )}
        {showPenne && (
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            className="cursor-help"
          >
            <Image src="/penne.png" alt="penne" width={75} height={75} />
          </motion.div>
        )}
      </div>
    </div>
  );
};
