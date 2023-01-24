// libraries
import { Link, useNavigate } from 'react-router-dom'
// components
import Nav from "./Nav"
// styling
import styles from './Header.module.css'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/reducers/auth-slice'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = (event) => {
        event.preventDefault()
        dispatch(authActions.setLoggedOut())
        // remove token from local storage
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        navigate('/')
    }

    return (
        <header className={styles['main-header']}>
            <Link to={'/'}>
                <h1>Wavform</h1>
            </Link>
            <Nav logout={logout} />
        </header>
    )
}

export default Header