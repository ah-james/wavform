import { Link } from 'react-router-dom'

import Nav from "./Nav"
import styles from './Header.module.css'

const Header = props => {

    return(
        <header className={styles['main-header']}>
            <Link to={'/'}>
                <h1>Wavform</h1>
            </Link>
            <Nav handleLogout={props.handleLogout} />
        </header>
    )
}

export default Header