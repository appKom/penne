import styles from "./Paragraph.module.css";


export const Paragraph = (props) => {
    return (
        <p className={styles.paragraph}>{props.text}</p>
    );
}