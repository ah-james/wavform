// libraries
import { useSelector } from 'react-redux'
// components
import Reviews from "../components/Reviews/Reviews"

const ReviewsContainer = () => {
    const reviews = useSelector((state) => state.reviews.albums)

    return (
        <div>
            <Reviews reviews={reviews} />
        </div>
    )
}

export default ReviewsContainer