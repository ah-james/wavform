import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const AlbumShowPage = () => {
    const params = useParams()
    const selectedAlbum = params.title

    const allReviews = useSelector(state => state.reviews.albums)

    const albumInfo = allReviews.find(review => {
        return review.album === selectedAlbum
    })

    return (
        <div>
            <h1>{albumInfo.album} by {albumInfo.artist}</h1>
        </div>
    )
}

export default AlbumShowPage