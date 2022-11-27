import React, { useState, useRef } from "react";

import styles from './AlbumForm.module.css'
import ErrorModal from '../UI/ErrorModal'
import Button from "../UI/Button";

const AlbumForm = props => {
    // create refs with useRef hook so that state updates when form is submitted
    // one for each input, ref prop in each html input element
    const artistInputRef = useRef()
    const albumInputRef = useRef()
    const ratingInputRef = useRef()
    const dateInputRef = useRef()

    // portion of state to deterimine if user input is valid (not empty)
    const [isValid, setIsValid] = useState(true)
    // state to handle errors
    const [error, setError] = useState()

    // no longer need change handler functions because of refs

    const handleError = () => {
        setError(null)
    }

    // create function to handle form submission
    const handleSubmit = event => {
        event.preventDefault()
        // save current values of input refs and use them in error handling
        const enteredArtist = artistInputRef.current.value
        const enteredAlbum = albumInputRef.current.value
        const enteredRating = ratingInputRef.current.value
        const enteredDate = dateInputRef.current.value

        if (enteredArtist.length === 0 || enteredAlbum.length === 0 || enteredRating.length === 0 || enteredDate.length === 0) {
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
            artist: enteredArtist,
            album: enteredAlbum,
            rating: enteredRating,
            date: new Date(enteredDate)
        }

        props.onSaveAlbum(albumData)
        // reset by manipulating DOM current value without react (DON'T DO THIS ANYWHERE ELSE)
        artistInputRef.current.value = ''
        albumInputRef.current.value = ''
        ratingInputRef.current.value = ''
        dateInputRef.current.value = ''
    }

    return(
        <>
            {error && <ErrorModal title={error.title} message={error.message} handleError={handleError} />}
            <form onSubmit={handleSubmit} >
                <div className={styles["new-album-controls"]}>
                    {/* dynamic style to determine invalid inputs */}
                    <div className={`${styles['new-album-control']} ${!isValid && styles.invalid}`}>
                        <label htmlFor="artist">Artist</label>
                        <input id="artist" type='text' ref={artistInputRef} />
                    </div>
                    <div className={`${styles['new-album-control']} ${!isValid && styles.invalid}`}>
                        <label htmlFor="album">Album</label>
                        <input id="album" type='text' ref={albumInputRef}/>
                    </div>
                    <div className={`${styles['new-album-control']} ${!isValid && styles.invalid}`}>
                        <label htmlFor="rating">Rating</label>
                        <input id="rating" type='number' min='0' max='10' ref={ratingInputRef} />
                    </div>
                    <div className={`${styles['new-album-control']} ${!isValid && styles.invalid}`}>
                        <label htmlFor="date">Date</label>
                        <input id="date" type='date' ref={dateInputRef} />
                    </div>
                </div>
                <div className={styles["new-album-actions"]}>
                    <Button type='button' handleClick={props.handleClick}>Cancel</Button>
                    <Button type="submit">Add Album</Button>
                </div>
            </form>
        </>
    )
}

export default AlbumForm