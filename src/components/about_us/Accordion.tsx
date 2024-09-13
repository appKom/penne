import { useState } from 'react';
import styles from '../../components/about_us/Members.module.css';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Accordion(props: { title: string; content: string[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.accordion}>
      <div
        className={styles.accordionHeader}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.accordionTitle}>{props.title}</div>
        <span>{isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}</span>
      </div>
      {
        <div
          className={
            isOpen ? styles.accordionContent : styles.accordionContentClosed
          }
        >
          {' '}
          {props.content.map((element) => {
            return <div key={element}>{element}</div>;
          })}
        </div>
      }
    </div>
  );
}
