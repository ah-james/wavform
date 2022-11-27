import React, { useContext } from 'react'

import AuthContext from '../../store/auth-context'
import Button from '../UI/Button'
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
                        <Button handleClick={ctx.handleLogout}>Logout</Button>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Nav