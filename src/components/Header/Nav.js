import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './Nav.module.css'

const Nav = props => {
    // use NavLink from react-router-dom, prevents page from reloading and can set CSS class on active path

    return(
        <nav className={styles.nav}>
            <ul>
                <li>
                    <NavLink className={(data) => data.isActive ? styles.active : ''} to='/login'>Login</NavLink>
                </li>
                <li>
                    <NavLink className={(data) => data.isActive ? styles.active : ''} to='/home'>Home</NavLink>
                </li>
                <li>
                    <NavLink className={(data) => data.isActive ? styles.active : ''} to='/reviews'>Reviews</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Nav