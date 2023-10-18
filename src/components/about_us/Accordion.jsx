// Accordion.js
import React, { useState } from 'react';
import styles from "../../components/about_us/Members.module.css"

export default function Accordion({ title, content }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.accordion}>
            <div className={styles.accordionHeader} onClick={() => setIsOpen(!isOpen)}>
                {title}
                <span>{isOpen ? '˄' : '˅'}</span>
            </div>
            {isOpen && <div className={styles.accordionContent}>    {content.map((element) => {
        return <div key={element}>{element}</div>;
    })}</div>}
        </div>
    );
}
