import  Member  from "../components/about_us/Members"
import styles from "../components/about_us/Members.module.css"



export default function OmOssPage() {
    return (
      <div id = { styles.titel2 } >
        <p id = {styles.titel}>Hei, dette er 'om oss' sida til fontnettsiden. 
            Denne delen er laget for styremedlemmene.
        </p>

        <div class = {styles.styremedlemmer}>
          <Member path={"resources/testbilde.jpg"}/>
          <Member path={"resources/testbilde.jpg"}/>
          <Member path={"resources/testbilde.jpg"}/>
          <Member path={"resources/testbilde.jpg"}/>
          <Member path={"resources/testbilde.jpg"}/>
          <Member path={"resources/testbilde.jpg"}/>
          <Member path={"resources/testbilde.jpg"}/>
        </div>
      </div>
    )
  }
  