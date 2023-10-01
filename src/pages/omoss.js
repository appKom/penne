import  Member  from "../components/about_us/Members"
import styles from "../components/about_us/Members.module.css"



export default function OmOssPage() {
    return (
      <div id = { styles.titel2 } >
        Om oss
        <Member path={"resources/testbilde.jpg"}/>
      </div>
    )
  }
  