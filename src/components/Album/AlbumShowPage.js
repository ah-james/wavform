import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import styles from './AlbumShowPage.module.css'

const AlbumShowPage = () => {
    const params = useParams()
    const selectedAlbum = params.title

    const reviews = useSelector(state => state.reviews.albums)

    const albumInfo = reviews.find(review => review.album === selectedAlbum)

    const albumReviews = reviews.filter(review => review.album === selectedAlbum)

    return (
        <div className={styles['album-info']}>
            <img src={albumInfo.art[1].url} />
            <h1>{albumInfo.album} by {albumInfo.artist}</h1>
            <ul>
                {albumReviews.map((review) => 
                    <li key={review.id}>{review.user}: {review.rating}/10</li>
                )}
            </ul>
        </div>
    )
}

export default AlbumShowPage