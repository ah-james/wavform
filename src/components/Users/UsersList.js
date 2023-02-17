// libraries
import { Link } from "react-router-dom"
import PropTypes from "prop-types";
// styles
import styles from './UsersList.module.css'

const UsersList = ({users}) => {

    return (
        <div>
            <ul>
                {users.map((user) =>
                    <li className={styles['user-link']} key={user}><Link to={`/user/${user}`}>{user}</Link></li>
                )}
            </ul>
        </div>
    )
}

UsersList.propTypes = {
    users: PropTypes.array
}

export default UsersList