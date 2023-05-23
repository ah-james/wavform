import { Link } from "react-router-dom"
import styles from './AlbumReviewsList.module.css'

const AlbumReviewsList = ({review}) => {

    return(
        <Link to={`/user/${review.user}`} key={review.id} class={styles['review-item']}>
            <li>{review.user}: {review.rating}/10</li>
        </Link>
    )
}

export default AlbumReviewsList