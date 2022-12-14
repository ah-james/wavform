import { useSelector } from 'react-redux'

import Reviews from "../components/Reviews/Reviews"

const ReviewsContainer = props => {
    const reviews = useSelector((state) => {
        return state.reviews.albums
    })

    return (
        <div>
            <Reviews reviews={reviews} />
        </div>
    )
}

export default ReviewsContainer