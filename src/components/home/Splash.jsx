import styles from './Splash.module.css';

export const Splash = ({img}) => {
    return (
        <div className={`relative flex justify-center items-center ${styles.splash}`}>
            <img 
                src={img} 
                alt="Realfagsbygget" 
                className={`w-1/3 ${styles.imgFadeIn}`}
            />
            <h1 className={`absolute text-white text-9xl font-playfair tracking-wider ${styles.textSlideUp}`}>
                {["ONLINE", <br key="linebreak"/>, "FONDET"]}
            </h1>
        </div>
    );
}
