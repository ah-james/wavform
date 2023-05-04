import { useSelector } from "react-redux"
import { useLocation, useParams } from "react-router-dom"
import styles from './AlbumShowPage.module.css'
import { useEffect, useState } from "react"

const AlbumShowPage = () => {
    const [album, setAlbum] = useState()

    const params = useParams()
    const selectedAlbum = params.title

    const location = useLocation()

    const { accessToken, albumId } = location.state 

    const reviews = useSelector(state => state.reviews.albums)

    const albumInfo = reviews.find(review => review.album === selectedAlbum)

    useEffect(() => {
        async function fetchData(albumId, accessToken) {
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

        setAlbum(fetchData())

    }, [setAlbum,albumInfo])



    const albumReviews = reviews.filter(review => review.album === selectedAlbum)

    return (
        <div className={styles['album-info']}>
            <img className={styles.image} src={albumInfo.art[1].url} />
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