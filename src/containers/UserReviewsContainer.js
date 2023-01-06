import { useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Reviews from "../components/Reviews/Reviews"

import styles from '../components/Reviews/ReviewsList.module.css'

const UserReviewsContainer = props => {
    const [reviews] = useState([])
    const params = useParams()

    const user = params.user

    const allReviews = useSelector(state => state.reviews.albums)

    if (reviews.length === 0) {
        for (let i = 0; i < allReviews.length; i++) {
            if (allReviews[i]['user'] === user) {
                reviews.push(allReviews[i])
            }
        }
    }

    return(
        <div>
            <h2 className={styles["reviews-list-fallback"]}>Reviews by {user}</h2>
            <Reviews reviews={reviews} />
        </div>
    )
}

export default UserReviewsContainer