import styles from './Paragraph.module.css';

export const Paragraph = (props: { text: string }) => {
  return <p className={styles.paragraph}>{props.text}</p>;
};
