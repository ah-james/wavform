import React, { useState } from "react";

import styles from './AlbumForm.module.css'
import ErrorModal from '../UI/ErrorModal'

const AlbumForm = props => {
    // manage state
    const [artist, setArtist] = useState('')
    const [album, setAlbum] = useState('')
    const [rating, setRating] = useState('')
    const [date, setDate] = useState('')
    // portion of state to deterimine if user input is valid (not empty)
    const [isValid, setIsValid] = useState(true)
    // state to handle errors
    const [error, setError] = useState()

    // all of this is super repetitive and it makes me mad but I'll change it later
    const handleArtistChange = (event) => {
        if (event.target.value.length > 0) {
            setIsValid(true)
        }
        setArtist(event.target.value)
    }

    const handleAlbumChange = event => {
        if (event.target.value.length > 0) {
            setIsValid(true)
        }
        setAlbum(event.target.value)
    }

    const handleRatingChange = (event) => {
        if (event.target.value.length > 0) {
            setIsValid(true)
        }
        setRating(event.target.value)
    }

    const handleDateChange = (event) => {
        if (event.target.value.length > 0) {
            setIsValid(true)
        }
        setDate(event.target.value)
    }

    const handleError = () => {
        setError(null)
    }

    // create function to handle form submission
    const handleSubmit = event => {
        event.preventDefault()
        if (artist.length === 0 || album.length === 0 || rating.length === 0 || date.length === 0) {
            // set errors
            setError({
                title: 'You missed a spot!',
                message: 'Please fill out each form field'
            })
            // set isValid to false
            setIsValid(false)
            return
        }
        const albumData = {
            artist: artist,
            album: album,
            rating: rating,
            date: new Date(date)
        }

        props.onSaveAlbum(albumData)
        // reset form input fields on submission
        setArtist('')
        setAlbum('')
        setRating('')
        setDate('')
    }

    return(
        <>
            {error && <ErrorModal title={error.title} message={error.message} handleError={handleError} />}
            <form onSubmit={handleSubmit} >
                <div className={styles["new-album-controls"]}>
                    {/* dynamic style to determine invalid inputs */}
                    <div className={`${styles['new-album-control']} ${!isValid && styles.invalid}`}>
                        <label>Artist</label>
                        <input type='text' value={artist} onChange={handleArtistChange} />
                    </div>
                    <div className={`${styles['new-album-control']} ${!isValid && styles.invalid}`}>
                        <label>Album</label>
                        <input type='text' value={album} onChange={handleAlbumChange} />
                    </div>
                    <div className={`${styles['new-album-control']} ${!isValid && styles.invalid}`}>
                        <label>Rating</label>
                        <input type='number' min='0' max='10' value={rating} onChange={handleRatingChange} />
                    </div>
                    <div className={`${styles['new-album-control']} ${!isValid && styles.invalid}`}>
                        <label>Date</label>
                        <input type='date' value={date} onChange={handleDateChange} />
                    </div>
                </div>
                <div className={styles["new-album-actions"]}>
                    <button type='button' onClick={props.handleClick}>Cancel</button>
                    <button type="submit">Add Album</button>
                </div>
            </form>
        </>
    )
}

export default AlbumForm