import ReviewItem from "./ReviewItem"
import styles from './ReviewsList.module.css'

const ReviewsList = props => {
    // set text shown on page if filteredAlbums is empty
    if (props.reviews.length === 0) {
        return <h2 className={styles["reviews-list-fallback"]}>No Reviews Found</h2>
    }

    return(
        <ul className={styles["reviews-list"]}>
            {props.reviews.map((filteredReview) => 
            <ReviewItem key={filteredReview.id} id={filteredReview.id} artist={filteredReview.artist} album={filteredReview.album} date={filteredReview.date} rating={filteredReview.rating} user={filteredReview.user} />
            )}
        </ul>
    )
}

export default ReviewsList