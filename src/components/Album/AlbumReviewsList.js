import { Link } from "react-router-dom"
import styles from './AlbumReviewsList.module.css'

const AlbumReviewsList = ({review}) => {

    return (
        <div className={styles['review-item']}>
            <p>Popular Reviews</p>
            <hr className={styles.rounded} ></hr>
            <ul>
                    <Link to={`/reviews/${review.id}`} key={review.id} state={{ creator: review.user }} className={styles['review-info']}>
                        <li>Review by {review.user} {review.rating}/10</li>
                    </Link>
            </ul>
        </div>
    )
}

export default AlbumReviewsList