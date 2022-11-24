import AuthContext from '../../store/auth-context'
import styles from './Nav.module.css'

const Nav = props => {
    return(
        <AuthContext.Consumer>
            {(ctx) => {
                return (
                    <nav className={styles.nav}>
                        <ul>
                            {ctx.loggedIn && (
                                <li>
                                    <a href='/'>Users</a>
                                </li>
                            )}
                            {ctx.loggedIn && (
                                <li>
                                    <button onClick={props.handleLogout}>Logout</button>
                                </li>
                            )}
                        </ul>
                    </nav>
                )
            }}
        </AuthContext.Consumer>
    )
}

export default Nav