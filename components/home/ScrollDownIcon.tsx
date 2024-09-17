'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';

const ScrollDownIcon = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleScroll = () => {
    if (window.scrollY > 500) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Rens opp event listener når komponenten fjernes
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Tom dependency array betyr at effekten kjøres ved mount og cleanup ved unmount

  const handleClick = (targetId: string) => {
    const targetElement = document.getElementById(targetId);
    targetElement?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={clsx(
        'flex justify-center items-center h-[10px] sticky bottom-10 cursor-pointer w-16 m-auto p-5 group',
        !isVisible && 'hidden',
      )}
      onClick={() => handleClick('home-text')}
    >
      <span className="border-solid border-white group-hover:border-gray-500 transition border-r-[5px] border-b-[5px] p-[6px] animate-bounceArrow"></span>
    </div>
  );
};

export default ScrollDownIcon;
