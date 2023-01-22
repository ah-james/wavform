// libraries
import { Link } from "react-router-dom"

const UsersList = props => {

    return (
        <div>
            <ul>
                {props.users.map((user) =>
                    <li key={user}><Link to={`/user/${user}`}>{user}</Link></li>
                )}
            </ul>
        </div>
    )
}

export default UsersList