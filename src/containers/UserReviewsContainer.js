// libraries
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
// components
import Reviews from "../components/Reviews/Reviews"
// styling
import styles from '../components/Reviews/ReviewsList.module.css'

const UserReviewsContainer = () => {
    const params = useParams()
    const user = params.user

    const allReviews = useSelector(state => state.reviews.albums)

    const reviews = allReviews.filter(review => review.user === user)

    return (
        <div>
            <h2 className={styles["reviews-list-fallback"]}>{user}</h2>
            <ul className={styles["centered"]}>
                <li>Films</li>
                <li>This Year</li>
                <li>List</li>
                <li>Following</li>
                <li>Followers</li>
            </ul>
            <Reviews reviews={reviews} showChart />
        </div>
    )
}

export default UserReviewsContainer