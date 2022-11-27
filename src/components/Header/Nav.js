import React, { useContext } from 'react'

import AuthContext from '../../store/auth-context'
import styles from './Nav.module.css'

const Nav = props => {
    // save AuthContext in constant with useContext hook
    const ctx = useContext(AuthContext)

    return(
        <nav className={styles.nav}>
            <ul>
                {ctx.loggedIn && (
                    <li>
                        <a href='/'>Users</a>
                    </li>
                )}
                {ctx.loggedIn && (
                    <li>
                        <button onClick={ctx.handleLogout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Nav