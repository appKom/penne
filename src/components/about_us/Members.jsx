import styles from "./Members.module.css"

const Member = ({path, name}) => {
    return (
        <div class = {styles.memberWrapper}>
            
            <img src={path} class = { styles.circleimage}/>
            <p class = { styles.memberName} > {name}</p>
            
        </div>
    );
}


export default Member;