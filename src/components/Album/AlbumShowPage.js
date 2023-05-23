import { useSelector } from "react-redux"
import { useLocation, useParams } from "react-router-dom"
import styles from './AlbumShowPage.module.css'
import { useEffect, useState } from "react"
import AlbumReviewsList from "./AlbumReviewsList"
import Card from "../UI/Card"

const AlbumShowPage = () => {
    const [album, setAlbum] = useState()
    const [loadedAlbum, setLoadedAlbum] = useState(false)
    const [genres, setGenres] = useState()
    const [content, setContent] = useState('artists')
    const [artistsActive, setArtistsActive] = useState(true)
    const [detailsActive, setDetailsActive] = useState(false)
    const [genresActive, setGenresActive] = useState(false)

    const params = useParams()
    const selectedAlbum = params.title

    const location = useLocation()

    const { accessToken, albumId } = location.state

    const reviews = useSelector(state => state.reviews.albums)

    useEffect(() => {
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
            setLoadedAlbum(true)
        }

        fetchData(albumId, accessToken)

    }, [albumId, accessToken])

    useEffect(() => {

        if (loadedAlbum) {
            const fetchGenres = async (artistId, accessToken) => {
                const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                })

                const data = await response.json()
                setGenres(data.genres)
            }

            fetchGenres(album.artists[0].id, accessToken)
        }

    }, [album, loadedAlbum, accessToken])



    const albumReviews = reviews.filter(review => review.album === selectedAlbum)

    if (album === undefined) {
        return (
            <div className={styles.loading}><p>Loading...</p></div>
        )
    }

    const changeSelect = clicked => {
        setContent(clicked)

        if (clicked === 'artists') {
            setArtistsActive(true)
            setDetailsActive(false)
            setGenresActive(false)
        }

        if (clicked === 'details') {
            setArtistsActive(false)
            setDetailsActive(true)
            setGenresActive(false)
        }

        if (clicked === 'genres') {
            setArtistsActive(false)
            setDetailsActive(false)
            setGenresActive(true)
        }
    }

    let displayContent

    if (content === 'artists') {
        // displayContent = <p>artists</p>
        displayContent =
            album.artists.map((artist, i) =>
                <li className={styles.inline} key={artist.name}>
                    <p className={styles.box}>{artist.name}</p>
                </li>
            )
    }

    if (content === 'details') {
        displayContent =
            <>
                <li key={'release-date'}>Release Date.......... <p className={styles.box}>{new Date(album.release_date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p></li>
                <li key={'label'}>Label.......... <p className={styles.box}>{album.label}</p></li>
            </>
    }

    if (content === 'genres') {
        displayContent =
            genres.map((genre) =>
                <li className={styles.inline} key={genre}>
                    <p className={styles.box}>{genre}</p>
                </li>
            )
    }

    return (
        <Card className={styles['album-info']}>
            <img className={styles.image} src={album.images[1].url} alt={album.name} />
            <div className={styles.row}>
                <h1 className={styles.inline}>{album.name}</h1><p>by</p><h1 className={styles.inline}>{album.artists[0].name}</h1>
                <p className={styles.date}>{new Date(album.release_date).getFullYear()}</p>
            </div>
            <div className={styles.selector}>
                <ul className={styles.switch}>
                    <li key={'artists-button'} className={artistsActive ? styles.selectedItem : ''} onClick={() => changeSelect('artists')}>Artists</li>
                    <li key={'details-button'} className={detailsActive ? styles.selectedItem : ''} onClick={() => changeSelect('details')}>Details</li>
                    <li key={'genres-button'} className={genresActive ? styles.selectedItem : ''} onClick={() => changeSelect('genres')}>Genres</li>
                </ul>
                <hr className={styles.rounded} />
                <ul className={styles.selection} key={'display-content'}>
                    {displayContent}
                </ul>
            </div>
            <ul>
                {albumReviews.map((review) =>
                    <AlbumReviewsList review={review} key={review.id} />
                )}
            </ul>
        </Card>
    )
}

export default AlbumShowPage