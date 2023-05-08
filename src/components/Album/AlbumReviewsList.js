import { Link } from "react-router-dom"

const AlbumReviewsList = ({review}) => {

    return(
        <Link to={`/user/${review.user}`} key={review.id}>
            <li>{review.user}: {review.rating}/10</li>
        </Link>
    )
}

export default AlbumReviewsList