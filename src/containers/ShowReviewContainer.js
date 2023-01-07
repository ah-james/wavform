import { useParams, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import UserShowReview from '../components/Users/UserShowReview'

const ShowReviewContainer = () => {
    // params gives key-value pairs where keys are segments leading to page
    // ex. here, path is reviews/:id so params.id which would take value from url
    // /reviews/helloworld --> params.id = helloworld
    const params = useParams()
    const location = useLocation()

    const creator = location.state.creator

    const reviews = useSelector(state => state.reviews.albums)

    const selectedReview = reviews.find(review => review.id === params.id)

    const user = localStorage.getItem('email') === creator

    return (
        <div>
            <UserShowReview user={user} selectedReview={selectedReview} />
        </div>
    )
}

export default ShowReviewContainer