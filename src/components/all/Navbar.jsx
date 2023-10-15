import styles from "./Navbar.module.css"

export const Navbar = ({img}) => {
    return(
        <div className={styles.navbar}>
            <img src={img} alt="Logo" className={styles.logo}/>
            <div className={styles.menu}>
                <p className={styles.menuItem}>Om oss</p>
                <p className={styles.menuItem}>Søknader</p>
            </div>
            <div className={styles.spacer}></div>
        </div>
    )
}