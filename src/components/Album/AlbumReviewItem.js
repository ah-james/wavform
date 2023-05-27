

const AlbumReviewItem = ({ review }) => {

    return (
        <li>Review by <b>{review.user}</b> {review.rating}/10</li>
    )
}

export default AlbumReviewItem