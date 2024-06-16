import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { Spiral as Hamburger } from "hamburger-react";

const useScrollHide = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setShowNavbar(currentScroll < lastScroll.current);
      lastScroll.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return showNavbar;
};

export const Navbar = ({ img, bekk }) => {
  const [showNavMenu, setShowNavMenu] = useState(false);
  const showNavbar = useScrollHide();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current.contains(event.target)) {
        setShowNavMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`flex items-center justify-center w-full h-full bg-[#131620] p-5 text-2xl ${
      showNavbar ? "sticky top-0 z-20 transition-opacity duration-200" : "opacity-0 invisible"
    }`}>
      <nav className="flex items-center justify-between w-full">
        <div ref={dropdownRef} className="block lg:hidden">
          <Hamburger toggled={showNavMenu} toggle={setShowNavMenu} />
          <div className={`${showNavMenu ? "flex" : "hidden"} flex-col absolute top-full left-0 right-0 bg-[#191919] z-50`}>
            <Link href="/" className="px-10 py-2 hover:bg-white hover:text-[#131620]">HJEM</Link>
            <Link href="/omoss" className="px-10 py-2 hover:bg-white hover:text-[#131620]">OM OSS</Link>
            <Link href="/soknad" className="px-10 py-2 hover:bg-white hover:text-[#131620]">SØKNAD</Link>
          </div>
        </div>
        <div id="online">
          <Link href="/">
            <img src={img} alt="Logo" className="h-full w-36" />
          </Link>
        </div>
        <div className="hidden text-white lg:flex lg:mx-auto">
          <Link href="/" className="px-10 py-2 transition-colors duration-50 hover:text-gray-200">HJEM</Link>
          <Link href="/omoss" className="px-10 py-2 transition-colors duration-50 hover:text-gray-200">OM OSS</Link>
          <Link href="/soknad" className="px-10 py-2 transition-colors duration-50 hover:text-gray-200">SØKNAD</Link>
        </div>
        <div id="bekk">
          <img src={bekk} alt="Bekk logo" className="w-36 h-full absolute top-1 right-2.5" />
        </div>
      </nav>
    </div>
  );
};
