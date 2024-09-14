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

  return (
    <div
      className={clsx(
        'flex justify-center items-center h-[10px]',
        !isVisible && 'hidden',
      )}
    >
      <span className="border-solid border-white border-r-[5px] border-b-[5px] border-l-0 border-t-0 inline-block p-[6px] animate-bounceArrow"></span>
    </div>
  );
};

export default ScrollDownIcon;
