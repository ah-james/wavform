import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { authActions } from '../../store/reducers/auth-slice'

import styles from './Nav.module.css'

const Nav = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // use NavLink from react-router-dom, prevents page from reloading and can set CSS class on active path
    const logout = (event) => {
        event.preventDefault()
        dispatch(authActions.setLoggedOut())
        // remove token from local storage
        localStorage.removeItem('token')
        navigate('/login')
    }

    const loggedIn = useSelector((state) => {
        return state.auth.loggedIn
    })

    let loginButton = 
    <li>
        <NavLink className={(data) => data.isActive ? styles.active : ''} to='/login'>Login</NavLink>
    </li>

    if (loggedIn) {
        loginButton = 
        <>
            <li>
                <NavLink className={(data) => data.isActive ? styles.active : ''} to='/login' onClick={logout}>Logout</NavLink>
            </li>
            <li>
                <NavLink className={(data) => data.isActive ? styles.active : ''} to='/home'>Home</NavLink>
            </li>
            <li>
                <NavLink className={(data) => data.isActive ? styles.active : ''} to='/settings'>Settings</NavLink>
            </li>
        </>
    }

    return(
        <nav className={styles.nav}>
            <ul>
                {loginButton}
                <li>
                    <NavLink className={(data) => data.isActive ? styles.active : ''} to='/reviews'>Reviews</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Nav