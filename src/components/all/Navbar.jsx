import Link from "next/link"
import styles from "./navbar.module.css"
import React, { useState, useEffect, useRef, useCallback } from 'react';



export const Navbar = ({img, bekk}) => {
    const [showNavbar, setShowNavbar] = useState(styles.navbar_box);
    const [lastScroll, setLastScroll] = useState(0);


    const controlNavbar = () => {
        if (typeof window !== 'undefined') { 
          if (lastScroll - window.scrollY < 0) { // if scroll down hide the navbar
            setShowNavbar(styles.hidden); 
          } else if (lastScroll - window.scrollY > 0) { // if scroll up show the navbar
            setShowNavbar(styles.navbar_box);  
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
      <div className={showNavbar}>
        <nav className='navbar'>
            <div className={styles.navbar}>
                <Link href={"/"}><img src={img} alt="Logo" className={styles.logo}/></Link>
                <div className={styles.menu}>
                    <Link href={"/omoss"} className={styles.menuItem}>Om oss</Link>
                    <Link href={"/soknad"} className={styles.menuItem}>Søknader</Link>
                    <a href={"https://online.ntnu.no"} className={styles.menuItem}>Online.ntnu.no</a>
                </div>
                <div className={styles.spacer}></div>
                <img src={bekk} alt="Bekk logo" className={styles.logo} />

            </div>
        </nav>
      </div>
    )
}