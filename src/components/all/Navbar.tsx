import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Spiral as Hamburger } from 'hamburger-react';
import clsx from 'clsx';

const navLinks = [
  { title: 'FONDET', path: '/' },
  { title: 'OM OSS', path: '/omoss' },
  { title: 'SØKNAD', path: '/soknad' },
];

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [showNavMenu, setShowNavMenu] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const controlNavbar = () => {
    const currentScroll = window.scrollY;

    setShowNavbar(currentScroll <= lastScroll);
    setLastScroll(currentScroll);
  };

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
    window.addEventListener('scroll', controlNavbar);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScroll]);

  return (
    <div
      className={clsx(
        showNavbar ? 'opacity-100' : 'opacity-0 pointer-events-none',
        'bg-[#131620] top-0 sticky w-full h-20 transition z-20 flex items-center justify-between p-5 text-xl',
      )}
    >
      {/* MOBILE HAMBURGER MENU */}
      <div ref={dropdownRef} className="md:hidden">
        <Hamburger toggled={showNavMenu} toggle={setShowNavMenu} />
        <div
          className={clsx(
            'absolute top-full left-0 right-0 flex flex-col bg-[#191919] border-t border-b border-gray-200',
            showNavMenu ? 'block' : 'hidden',
          )}
        >
          {navLinks.map((link) => (
            <Link
              to={link.path}
              className="block px-8 py-4 hover:bg-white transition hover:text-[#131620]"
              key={link.title}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>

      <Link to="/">
        <img src="Online_hvit.png" alt="Logo" className="h-auto w-36" />
      </Link>

      {/* DESKTOP NAVBAR */}
      <div className="justify-center flex-grow hidden md:flex">
        {navLinks.map((link) => (
          <Link
            to={link.path}
            className="px-8 py-4 hover:text-[#FAB759] transition"
            key={link.title}
          >
            {link.title}
          </Link>
        ))}
      </div>

      <Link
        to="https://www.bekk.no/"
        target="_blank"
        className="hidden md:block"
      >
        <img
          src="Bekk_navnetrekk_hvit.svg"
          alt="Bekk logo"
          className="h-auto w-36"
        />
      </Link>
    </div>
  );
};

export default Navbar;
