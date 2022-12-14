import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

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

    if (!selectedReview) {
        return <h1>No Review Found</h1>
    }

    return(
        <div>
            <h1>Show Review</h1>
            <p>{selectedReview.artist}</p>
            <p>{selectedReview.album}</p>
            <p>{selectedReview.rating}</p>
        </div>
    )
}

export default ShowReviewContainer