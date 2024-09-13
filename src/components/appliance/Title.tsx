import styles from './Title.module.css';

const Title = (props: { header: string; title: string }) => {
  return <h1 id={styles.header}>{props.title}</h1>;
};

export default Title;
