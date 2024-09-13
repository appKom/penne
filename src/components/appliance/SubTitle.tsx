import styles from './SubTitle.module.css';

const SubTitle = (props: { title: string }) => {
  return <h1 id={styles.header}>{props.title}</h1>;
};

export default SubTitle;
