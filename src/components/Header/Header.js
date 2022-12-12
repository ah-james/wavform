// import Nav from "./Nav"
import styles from './Header.module.css'

const Header = props => {
    return(
        <header className={styles['main-header']}>
            <h1>Bouncr: Social Media for Music Fans</h1>
            {/* <Nav handleLogout={props.handleLogout} /> */}
        </header>
    )
}

export default Header