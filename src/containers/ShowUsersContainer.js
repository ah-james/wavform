// libraries
import { useSelector } from "react-redux"
import UsersList from "../components/Users/UsersList"
// styling
import styles from './Container.module.css'

const ShowUsersContainer = () => {
    const reviews = useSelector((state) => state.reviews.albums)

    const users = Object.entries(reviews).map(review => review[1].user)

    const displayUsers = [...new Set(users)]

    return (
        <div>
            <h1 className={styles['center-text']}>Users</h1>
            <UsersList users={displayUsers} />
        </div>
    )
}

export default ShowUsersContainer