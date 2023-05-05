import { useSelector } from "react-redux"
import { useLocation, useParams } from "react-router-dom"
import styles from './AlbumShowPage.module.css'
import { useEffect, useState } from "react"
// import { fetchAlbumData } from "../../store/actions/spotify-actions"

const AlbumShowPage = () => {
    const [album, setAlbum] = useState()

    const params = useParams()
    const selectedAlbum = params.title

    const location = useLocation()

    const { accessToken, albumId } = location.state

    const reviews = useSelector(state => state.reviews.albums)

    const albumInfo = reviews.find(review => review.album === selectedAlbum)

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
            return data
        }

        const albumData = fetchData(albumId, accessToken)

}, [albumId, accessToken])

const albumReviews = reviews.filter(review => review.album === selectedAlbum)

if (album === undefined) {
    return (
        <div>Loading...</div>
    )
}

return (
    <div className={styles['album-info']}>
        <img className={styles.image} src={albumInfo.art[1].url} alt={albumInfo.name} />
        <h1>{albumInfo.name} by {albumInfo.artist}</h1>
        <ul>
            {albumReviews.map((review) =>
                <li key={review.id}>{review.user}: {review.rating}/10</li>
            )}
        </ul>
    </div>
)
}

export default AlbumShowPage