import { useSelector } from "react-redux"
import { useLocation, useParams } from "react-router-dom"
import styles from './AlbumShowPage.module.css'
import { useEffect, useState } from "react"
import AlbumReviewsList from "./AlbumReviewsList"
// import { fetchAlbumData } from "../../store/actions/spotify-actions"

const AlbumShowPage = () => {
    const [album, setAlbum] = useState()

    const params = useParams()
    const selectedAlbum = params.title

    const location = useLocation()

    const { accessToken, albumId } = location.state

    const reviews = useSelector(state => state.reviews.albums)

    useEffect(() => {
        // const data = fetchAlbumData(albumId, accessToken)
        const fetchData = async (albumId, accessToken) => {
            const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            })

            const data = await response.json()
            setAlbum(data)
        }

        fetchData(albumId, accessToken)

    }, [albumId, accessToken])

    const albumReviews = reviews.filter(review => review.album === selectedAlbum)

    if (album === undefined) {
        return (
            <div className={styles.loading}><p>Loading...</p></div>
        )
    }

    return (
        <div className={styles['album-info']}>
            <img className={styles.image} src={album.images[1].url} alt={album.name} />
            <h1>{album.name} by {album.artists[0].name}</h1>
            <p>{new Date(album.release_date).getFullYear()}</p>
            <ul>
                {albumReviews.map((review) =>
                    <AlbumReviewsList review={review} />
                )}
            </ul>
        </div>
    )
}

export default AlbumShowPage