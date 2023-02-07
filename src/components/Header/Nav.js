// libraries
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
// redux store
// styles
import styles from './Nav.module.css'

const Nav = ({logout}) => {
    // use NavLink from react-router-dom, prevents page from reloading and can set CSS class on active path

    const loggedIn = useSelector((state) => {
        return state.auth.loggedIn
    })

    const activeButton = (data) => data.isActive ? styles.active : ''
    

    let loginButton =
    <>
        <li>
            <NavLink className={activeButton} to='/login'>Sign In</NavLink>
        </li>
        <li>
            <NavLink className={activeButton} to='/signup'>Create Account</NavLink>
        </li>
    </>

    if (loggedIn) {
        loginButton =
            <>
                <li>
                    <NavLink className={activeButton} to='/login' onClick={logout}>Logout</NavLink>
                </li>
                <li>
                    <NavLink className={activeButton} to='/'>Home</NavLink>
                </li>
                <li>
                    <NavLink className={activeButton} to='/settings'>Settings</NavLink>
                </li>
            </>
    }

    return (
        <nav className={styles.nav}>
            <ul>
                {loginButton}
                <li>
                    <NavLink className={activeButton} to='/reviews'>Reviews</NavLink>
                </li>
                <li>
                    <NavLink className={activeButton} to='/users'>Users</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Nav