// libraries
import { Link } from "react-router-dom"
// styling
import styles from './RecentReviewsList.module.css'

const RecentReviewsList = props => {
    return(
        <div className={styles.recent}>
            <h2>Recent Reviews</h2>
            <div className={styles.images}>
                {props.reviews.map((review) => 
                    <Link key={review.id} to={`/reviews/${review.id}`} state={{ creator: review.user }}><img alt={review.album} src={review.art[1].url} /></Link>
                )}
            </div>
        </div>
    )
}

export default RecentReviewsList