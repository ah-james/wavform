import { Link } from "react-router-dom"
import styles from './AlbumReviewsList.module.css'

const AlbumReviewsList = ({ reviews }) => {

    return (
        <div className={styles['review-item']}>
            <p>Popular Reviews</p>
            <hr className={styles.rounded} ></hr>
            <ul className={styles['reviews-list']}>
                {reviews.map((review) =>
                    <Link to={`/reviews/${review.id}`} key={review.id} state={{ creator: review.user }} className={styles['review-info']}>
                        <li>Review by <b>{review.user}</b> {review.rating}/10</li>
                    </Link>
                )}
            </ul>
        </div>
    )
}

export default AlbumReviewsList