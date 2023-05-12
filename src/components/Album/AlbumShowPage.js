import { useSelector } from "react-redux"
import { useLocation, useParams } from "react-router-dom"
import styles from './AlbumShowPage.module.css'
import { useEffect, useState } from "react"
import AlbumReviewsList from "./AlbumReviewsList"
import Card from "../UI/Card"
// import { fetchAlbumData } from "../../store/actions/spotify-actions"

const AlbumShowPage = () => {
    const [album, setAlbum] = useState()
    const [content, setContent] = useState('artists')

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

    const changeSelect = clicked => {
        setContent(clicked)
    }

    let displayContent

    if (content === 'artists') {
        displayContent = <p>artists</p>
    }

    if (content === 'details') {
        displayContent = <p>details</p>
    }

    if (content === 'genres') {
        displayContent = <p>genres</p>
    }

    return (
        <Card className={styles['album-info']}>
            <img className={styles.image} src={album.images[1].url} alt={album.name} />
            <div className={styles.row}>
                <h1>{album.name} by {album.artists[0].name}</h1>
                <p>{new Date(album.release_date).getFullYear()}</p>
            </div>
            <div className={styles.switch}>
                <ul>
                    <li onClick={() => changeSelect('artists')}>Artists</li>
                    <li onClick={() => changeSelect('details')}>Details</li>
                    <li onClick={() => changeSelect('genres')}>Genres</li>
                </ul>
                <hr className={styles.rounded} />
                <div>
                    {displayContent}
                </div>
            </div>
            <ul>
                {albumReviews.map((review) =>
                    <AlbumReviewsList review={review} />
                )}
            </ul>
        </Card>
    )
}

export default AlbumShowPage