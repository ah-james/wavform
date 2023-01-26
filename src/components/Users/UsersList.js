// libraries
import { Link } from "react-router-dom"
// styles
import styles from './UsersList.module.css'

const UsersList = props => {

    return (
        <div>
            <ul>
                {props.users.map((user) =>
                    <li className={styles['user-link']} key={user}><Link to={`/user/${user}`}>{user}</Link></li>
                )}
            </ul>
        </div>
    )
}

export default UsersList