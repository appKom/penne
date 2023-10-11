import styles from "./Members.module.css"

const Member = ({path}) => {
    return (
        <div class = {styles.memberWrapper}>
            
            <img src={path} class = { styles.circleimage}/>
            <p class = { styles.memberName} > Johanna Wilmers	 </p>
            
        </div>
    );
}


export default Member;