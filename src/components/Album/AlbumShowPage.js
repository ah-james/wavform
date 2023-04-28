import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const AlbumShowPage = () => {
    const params = useParams()
    const selectedAlbum = params.title

    const allReviews = useSelector(state => state.reviews.albums)

    const album = allReviews.find(review => review.album === selectedAlbum)

    return (
        <div>
            <h1>Album Show</h1>
        </div>
    )
}

export default AlbumShowPage