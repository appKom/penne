import React, { useState, useEffect } from 'react';
import styles from './ScrollDownIcon.module.css';

const ScrollDownIcon = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 80 && window.scrollY <= 500) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
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
        <div className={`${styles.scrollDown} ${isVisible ? '' : styles.hidden}`}>
            <span className={styles.arrow}></span>
        </div>
    );
}

export default ScrollDownIcon;
