import styles from "./Title.module.css";

const Title = (props) => {
    return (
        <h1 id={styles.header}>{props.title}</h1>
    );
}

export default Title;
