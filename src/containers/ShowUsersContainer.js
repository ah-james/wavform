// libraries
import { useSelector } from "react-redux"
import UsersList from "../components/Users/UsersList"
// styling
import styles from './Container.module.css'

const ShowUsersContainer = () => {
    const reviews = useSelector((state) => {
        return state.reviews.albums
    })

    let users = []

    for (let i = 0; i < reviews.length; i++) {
        users.push(reviews[i].user)
    }

    const displayUsers = [...new Set(users)]

    return (
        <div>
            <h1 className={styles['center-text']}>Users</h1>
            <UsersList users={displayUsers} />
        </div>
    )
}

export default ShowUsersContainer