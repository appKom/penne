import Link from "next/link";
import styles from "./navbar.module.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Spiral as Hamburger } from "hamburger-react";

export const Navbar = ({ img, bekk }) => {
  const [showNavbar, setShowNavbar] = useState(styles.navbar_box);
  const [lastScroll, setLastScroll] = useState(0);
  const [showNavMenu, setShowNavMenu] = useState(false);

  const dropdownRef = useRef(null);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (lastScroll - window.scrollY < 0) {
        // if scroll down hide the navbar
        setShowNavbar(styles.hidden);
      } else if (lastScroll - window.scrollY > 0) {
        // if scroll up show the navbar
        setShowNavbar(styles.navbar_box);
      }

      // remember current page location to use in the next move
      setLastScroll(window.scrollY);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNavMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScroll]);

  return (
    <div className={showNavbar}>
      <nav className="navbar">
        <div className={styles.navbar}>
          <div ref={dropdownRef} className={styles.mobilemenucontainer}>
            <Hamburger
              toggled={showNavMenu}
              toggle={setShowNavMenu}
            ></Hamburger>
            <div
              ref={dropdownRef}
              className={styles.mobilemenu}
              style={{ display: showNavMenu ? "flex" : "none" }}
            >
              <Link href={"/"} className={styles.menuItem}>
                HJEM
              </Link>
              <Link href={"/omoss"} className={styles.menuItem}>
                OM OSS
              </Link>
              <Link href={"/soknad"} className={styles.menuItem}>
                SØKNAD
              </Link>
            </div>
          </div>
          <div id={styles.online}>
            <Link href={"/"}>
              <img src={img} alt="Logo" className={styles.logo} />
            </Link>
          </div>
          <div className={styles.menu}>
            <Link href={"/"} className={styles.menuItem}>
              HJEM
            </Link>
            <Link href={"/omoss"} className={styles.menuItem}>
              OM OSS
            </Link>
            <Link href={"/soknad"} className={styles.menuItem}>
              SØKNAD
            </Link>
          </div>

          <div id={styles.bekk}>
            <img
              src={bekk}
              alt="Bekk logo"
              className={styles.logo + " " + styles.bekklogo}
            />
          </div>
        </div>
      </nav>
    </div>
  );
};
