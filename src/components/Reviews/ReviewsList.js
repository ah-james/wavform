// libraries
import PropTypes from "prop-types";
// components
import ReviewItem from "./ReviewItem"
// styling
import styles from './ReviewsList.module.css'

const ReviewsList = ({reviews}) => {
    // set text shown on page if filteredAlbums is empty
    if (reviews.length === 0) {
        return <h2 className={styles["reviews-list-fallback"]}>No Reviews Found</h2>
    }

    return (
        <ul className={styles["reviews-list"]}>
            {reviews.map((filteredReview) =>
                <ReviewItem key={filteredReview.id} id={filteredReview.id} art={filteredReview.art} artist={filteredReview.artist} album={filteredReview.album} date={filteredReview.date} rating={filteredReview.rating} user={filteredReview.user} />
            )}
        </ul>
    )
}

ReviewsList.propTypes = {
    reviews: PropTypes.object
}

export default ReviewsList