import { Link } from "react-router-dom"
import styles from './AlbumReviewsList.module.css'

const AlbumReviewsList = ({review}) => {

    return(
        <Link to={`/reviews/${review.id}`} key={review.id} state={{ creator: review.user }} className={styles['review-item']}>
            <li>{review.user}: {review.rating}/10</li>
        </Link>
    )
}

export default AlbumReviewsList