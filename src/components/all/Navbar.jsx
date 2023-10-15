import Link from "next/link"
import styles from "./Navbar.module.css"
import React, { useState, useEffect } from 'react';

export const Navbar = ({img}) => {
    const [showNavbar, setShowNavbar] = useState("navbar");
    const [lastScroll, setLastScroll] = useState(0);

    const controlNavbar = () => {
        if (typeof window !== 'undefined') { 
          if (window.scrollY > lastScroll) { // if scroll down hide the navbar
            setShowNavbar("navbar"); 
          } else { // if scroll up show the navbar
            setShowNavbar("hidden");  
          }

          // remember current page location to use in the next move
      setLastScroll(window.scrollY); 
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScroll]);

    return(
        <nav className={showNavbar}>
            <div className={styles.navbar}>
                <img src={img} alt="Logo" className={styles.logo}/>
                <div className={styles.menu}>
                    <Link href={"/omoss"} className={styles.menuItem}>Om oss</Link>
                    <Link href={"/soknad"} className={styles.menuItem}>Søknader</Link>
                </div>
                <div className={styles.spacer}></div>
            </div>
        </nav>
    )
}