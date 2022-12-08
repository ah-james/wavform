import React, { useState, useRef } from "react";

import styles from './ReviewForm.module.css'
import ErrorModal from '../UI/ErrorModal'
import Button from "../UI/Button";
import Input from '../UI/Input'

const ReviewForm = props => {
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
        const reviewData = {
            artist: enteredArtist,
            album: enteredAlbum,
            rating: enteredRating,
            date: enteredDate
        }

        props.onSaveAlbum(reviewData)
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
                <div className={styles["new-review-controls"]}>
                    <Input id="artist" type='text' label="Artist" ref={artistInputRef} />
                    <Input id="album" type='text' label='Album' ref={albumInputRef} />
                    <Input id='rating' type='number' label="Rating" ref={ratingInputRef} />
                    <Input id='date' type='date' label='date' ref={dateInputRef} />
                </div>
                <div className={styles["new-review-actions"]}>
                    <Button type='button' handleClick={props.handleClick}>Cancel</Button>
                    <Button type="submit">Add Review</Button>
                </div>
            </form>
        </>
    )
}

export default ReviewForm