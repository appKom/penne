import styles from './Splash.module.css';

export const Splash = ({ img }) => {
    return (
      <div className={`relative flex justify-center items-center ${styles.splash}`}>
        <div className="img-container">
          <img
            src={img}
            alt="Realfagsbygget"
            className={styles.imgFadeIn}
          />
        </div>
        <h1 id={styles.tekst} className={styles.textSlideUp}>
          {["ONLINE", <br key="linebreak" />, "FONDET"]}
        </h1>
      </div>
    );
  };
  
