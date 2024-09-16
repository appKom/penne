import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Spiral as Hamburger } from 'hamburger-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const navLinks = [
  { title: 'Fondet', path: '/' },
  { title: 'Styret', path: '/styret' },
  { title: 'Søknad', path: '/soknad' },
];

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScroll = window.scrollY;

      setShowNavbar(currentScroll <= lastScroll);
      setLastScroll(currentScroll);
    };
    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScroll]);

  return (
    <div
      className={clsx(
        showNavbar ? 'opacity-100' : 'opacity-0 pointer-events-none',
        'bg-[#131620] top-0 sticky w-full transition z-20 flex items-center justify-between px-4 py-2 md:py-5 md:px-8 border-b border-[#293046] shadow-md',
      )}
    >
      <MobileNavbar />
      <DesktopNavbar />
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
    <div className="flex items-center justify-between w-full md:hidden">
      <Link
        to="/"
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
                to={link.path}
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

const DesktopNavbar = () => (
  <div className="items-center justify-between hidden w-full md:flex">
    <Link to="/" className="p-2 text-2xl font-bold transition hover:opacity-50">
      Onlinefondet
    </Link>

    {/* NAV-ITEMS */}
    <div className="absolute left-0 right-0 flex justify-center gap-8 m-auto mx-auto transform -translate-y-1/2 top-1/2">
      {navLinks.map((link) => (
        <Link
          to={link.path}
          className="px-4 py-2 transition hover:bg-[#1e2334] text-lg rounded-md border hover:border hover:border-[#293046] border-[#131620] tracking-wide"
          key={link.title}
        >
          {link.title}
        </Link>
      ))}
    </div>

    <Link
      to="https://www.bekk.no/"
      target="_blank"
      className="hidden p-2 transition md:block hover:opacity-50"
    >
      <img src="bekk_white.svg" alt="Bekk logo" className="h-10" />
    </Link>
  </div>
);
