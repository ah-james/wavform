// libraries
import { Link } from "react-router-dom"
// styling
import styles from './RecentReviewsList.module.css'

const RecentReviewsList = props => {
    return (
        <div className={styles.recent}>
            <h2>Recent Reviews</h2>
            <ul className={styles.images}>
                {props.reviews.map((review) =>
                    <li className={styles.container} key={review.id} >
                        <Link to={`/reviews/${review.id}`} state={{ creator: review.user }}>
                            <img alt={review.album} src={review.art[1].url} />
                            <div className={styles.overlay}>{review.album}</div>
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default RecentReviewsList