// Accordion.js
import React, { useState } from "react";
import styles from "../../components/about_us/Members.module.css";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Accordion({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.accordion}>
      <div
        className={styles.accordionHeader}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.accordionTitle}>{title}</div>

        <span>{isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}</span>
      </div>
      {
        <div
          className={
            isOpen ? styles.accordionContent : styles.accordionContentClosed
          }
        >
          {" "}
          {content.map((element) => {
            return <div key={element}>{element}</div>;
          })}
        </div>
      }
    </div>
  );
}
