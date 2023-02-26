// libraries
import PropTypes from "prop-types";
import RecentAlbumCard from "./RecentAlbumCard";
// styling
import styles from './RecentReviewsList.module.css'

const RecentReviewsList = ({ reviews }) => {
    return (
        <div className={styles.recent}>
            <div>
                <ul className={styles.centered}>
                    {reviews.map((review, index) => 
                        <RecentAlbumCard review={review} key={index} />
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