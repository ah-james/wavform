import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ShowReview from '../components/ShowReview/ShowReview'

// to do:
// show who wrote the review
// allow user who created to delete and edit review
const ShowReviewContainer = () => {
    // params gives key-value pairs where keys are segments leading to page
    // ex. here, path is reviews/:id so params.id which would take value from url
    // /reviews/helloworld --> params.id = helloworld
    const params = useParams()

    const reviews = useSelector((state) => {
        return state.reviews.albums
    })

    const selectedReview = reviews.find(
        review => review.id === params.id
    )

    return(
        <div>
            <ShowReview selectedReview={selectedReview} />
        </div>
    )
}

export default ShowReviewContainer