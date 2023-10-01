import styles from "./Members.module.css"

const Member = ({path}) => {
    return (
        <div>
            <p id = {styles.titel}>Hei, dette er 'om oss' sida til fontnettsiden. 
            Denne delen er laget for styremedlemmene.</p>
            <img src={path} class = { styles.circleimage}/>
            
        </div>
    );
}


export default Member;