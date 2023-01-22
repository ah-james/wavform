import { useSelector } from "react-redux"

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
            <ul>
                {displayUsers.map((user) => 
                    <li>{user}</li>
                )}
            </ul>
        </div>
    )
}

export default ShowUsersContainer