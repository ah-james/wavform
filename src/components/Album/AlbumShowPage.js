import { useSelector } from "react-redux"
import { useLocation, useParams } from "react-router-dom"
import styles from './AlbumShowPage.module.css'
import { useEffect, useState } from "react"
import { fetchAlbumData } from "../../store/actions/spotify-actions"

const AlbumShowPage = () => {
    const [album, setAlbum] = useState()
    const [loading, setLoading] = useState(true)

    const params = useParams()
    const selectedAlbum = params.title

    const location = useLocation()

    const { accessToken, albumId } = location.state 

    const reviews = useSelector(state => state.reviews.albums)

    const albumInfo = reviews.find(review => review.album === selectedAlbum)

    useEffect(() => {
        const data = fetchAlbumData(albumId, accessToken)
        setAlbum(data)
        setLoading(false)

    }, [albumId, accessToken])

    const albumReviews = reviews.filter(review => review.album === selectedAlbum)

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className={styles['album-info']}>
            <img className={styles.image} src={albumInfo.art[1].url} />
            <h1>{album.name} by {album.artists[0].name}</h1>
            <ul>
                {albumReviews.map((review) =>
                    <li key={review.id}>{review.user}: {review.rating}/10</li>
                )}
            </ul>
        </div>
    )
}

export default AlbumShowPage