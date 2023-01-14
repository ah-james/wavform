import React, { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'


import styles from './NewReview.module.css'
import ReviewForm from "./ReviewForm"
import Button from "../UI/Button"
import { addReview } from '../../store/actions/reviews-actions';
import FindAlbum from "./FindAlbum"

const NewReview = () => {
    const [mountAlbumForm, setMountAlbumForm] = useState(false)
    const [mountReviewForm, setMountReviewForm] = useState(false)
    const [foundArtist, setFoundArtist] = useState()
    const [foundAlbum, setFoundAlbum] = useState()

    const dispatch = useDispatch()

    const accessToken = useSelector(state => {
        return state.spotify.accessToken
    })

    const handleSaveReview = async (review) => {
        // could add useNavigate hook in app and history.push() to navigate to new page when
        // form is submitted? just ideas for the future
        dispatch(addReview(review, accessToken))
    }

    const handleFindAlbumClick = () => {
        setMountAlbumForm(current => !current)
    }

    const handleReviewFormClick = async album => {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${album}&type=album`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        
        const albumData = await response.json()
        const chosenAlbum = albumData.albums.items[0]

        setFoundAlbum(chosenAlbum.name)
        setFoundArtist(chosenAlbum.artists[0].name)

        setMountAlbumForm(current => !current)
        setMountReviewForm(current => !current)
    }

    const handleClick = () => {
        setMountReviewForm(current => !current)
    }

    if (mountAlbumForm) {
        return (
            <div className={styles["new-review"]}>
                 <FindAlbum handleClick={handleReviewFormClick} />
             </div>
        )
    }

    if (mountReviewForm) {
        return (
            <div className={styles["new-review"]}>
                <ReviewForm handleClick={handleClick} onSaveReview={handleSaveReview} artist={foundArtist} album={foundAlbum} />
            </div>
        )
    }

    return (
        <div className={styles['new-review']}>
            <Button handleClick={handleFindAlbumClick}>Add an Album</Button>
        </div>
    )


}

export default NewReview