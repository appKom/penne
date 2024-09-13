import styles from './Members.module.css';

const Member = (props: { path: string; name: string }) => {
  return (
    <div className={styles.memberWrapper}>
      <img src={props.path} className={styles.circleimage} />
      <p className={styles.memberName}> {props.name}</p>
    </div>
  );
};

export default Member;
