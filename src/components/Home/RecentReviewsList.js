// libraries
import PropTypes from "prop-types";
import RecentAlbumCard from "./RecentAlbumCard";
// styling
import styles from './RecentReviewsList.module.css'

const RecentReviewsList = ({ reviews }) => {
    return (
        <div className={styles.recent}>
            <h2>Recent Reviews</h2>
            <div>
                <ul className={styles.centered}>
                    {reviews.map((review) =>
                        <RecentAlbumCard review={review} />
                    )}
                </ul>
            </div>
        </div>
    )
}

RecentReviewsList.propTypes = {
    reviews: PropTypes.array
}

export default RecentReviewsList