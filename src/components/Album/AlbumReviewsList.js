

const AlbumReviewsList = ({review}) => {

    return(
        <li key={review.id}>{review.user}: {review.rating}/10</li>
    )
}

export default AlbumReviewsList