import styles from './AlbumReviewIttem.module.css'

const AlbumReviewItem = ({ review }) => {

    return (
        <>
            <li>Review by <b>{review.user}</b> {review.rating}/10</li>
            <hr className={styles.rounded} />
        </>
    )
}

export default AlbumReviewItem