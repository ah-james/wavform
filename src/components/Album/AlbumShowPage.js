import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const AlbumShowPage = () => {
    const params = useParams()
    const selectedAlbum = params.title

    const reviews = useSelector(state => state.reviews.albums)

    const albumInfo = reviews.find(review => review.album === selectedAlbum)

    const albumReviews = reviews.filter(review => review.album === selectedAlbum)

    return (
        <div>
            <h1>{albumInfo.album} by {albumInfo.artist}</h1>
            <ul>
                {albumReviews.map((review) => 
                    <li>{review.user}</li>
                )}
            </ul>
        </div>
    )
}

export default AlbumShowPage