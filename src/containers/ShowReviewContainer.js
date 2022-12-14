import { useParams } from 'react-router-dom'

const ShowReviewContainer = props => {
    // params gives key-value pairs where keys are segments leading to page
    // ex. here, path is reviews/:id so params.id which would take value from url
    // /reviews/helloworld --> params.id = helloworld
    const params = useParams()

    return(
        <div>
            <h1>Show Review</h1>
            <p>{params.id}</p>
        </div>
    )
}

export default ShowReviewContainer