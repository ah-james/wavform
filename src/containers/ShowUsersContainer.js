// libraries
import { useSelector } from "react-redux"
import UsersList from "../components/Users/UsersList"

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
            <UsersList users={displayUsers} />
        </div>
    )
}

export default ShowUsersContainer