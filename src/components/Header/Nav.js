// libraries
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
// redux store
import { authActions } from '../../store/reducers/auth-slice'
// styles
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
        localStorage.removeItem('email')
        navigate('/')
    }

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
                    <NavLink className={activeButton} to='*'>Users</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Nav