import styles from "./Members.module.css";

const Member = ({ path, name }) => {
  return (
    <div className={styles.memberWrapper}>
      <img src={path} className={styles.circleimage} />
      <p className={styles.memberName}> {name}</p>
    </div>
  );
};

export default Member;
