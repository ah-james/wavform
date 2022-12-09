import React, { useState, useRef } from "react";

import styles from './ReviewForm.module.css'
import ErrorModal from '../UI/ErrorModal'
import Button from "../UI/Button";
import Input from '../UI/Input'

const ReviewForm = props => {
    // can create refs with useRef hook so that state updates when form is submitted
    // one for each input, ref prop in each html input element
    const artistInputRef = useRef()
    const albumInputRef = useRef()
    const ratingInputRef = useRef()
    const dateInputRef = useRef()

    // portion of state to deterimine if user input is valid (not empty)
    const [artistIsValid, setArtistIsValid] = useState(true)
    const [albumIsValid, setAlbumIsValid] = useState(true)
    const [ratingIsValid, setRatingIsValid] = useState(true)
    const [dateIsValid, setDateIsValid] = useState(true)
    // state to handle errors
    const [error, setError] = useState()

    // no longer need change handler functions because of refs

    const handleError = () => {
        setError(null)
    }

    // create function to handle form submission
    const handleSubmit = event => {
        event.preventDefault()
        // set valid checkers to true
        setAlbumIsValid(true)
        setArtistIsValid(true)
        setRatingIsValid(true)
        setDateIsValid(true)


        // save current values of input refs and use them in error handling
        const enteredArtist = artistInputRef.current.value
        const enteredAlbum = albumInputRef.current.value
        const enteredRating = ratingInputRef.current.value
        const enteredDate = dateInputRef.current.value

        if (enteredArtist.length === 0) {
            // set errors
            setError({
                title: 'You missed a spot!',
                message: 'Please enter an artist'
            })
            // set isValid to false
            setArtistIsValid(false)
            return
        }

        if (enteredAlbum.length === 0) {
            setError({
                title: 'You missed a spot!',
                message: 'Please enter an album'
            })
            setAlbumIsValid(false)
            return
        }

        if (enteredRating.length === 0) {
            setError({
                title: 'You missed a spot!',
                message: 'Please enter a rating'
            })
            setRatingIsValid(false)
            return
        }

        if (enteredDate.length === 0) {
            setError({
                title: 'You missed a spot!',
                message: 'Please enter a date'
            })
            setDateIsValid(false)
            return
        }

        const reviewData = {
            artist: enteredArtist,
            album: enteredAlbum,
            rating: enteredRating,
            date: enteredDate
        }

        props.onSaveReview(reviewData)
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
                    <Input id="artist" type='text' label="Artist" ref={artistInputRef} isValid={artistIsValid} />
                    <Input id="album" type='text' label='Album' ref={albumInputRef} isValid={albumIsValid}/>
                    <Input id='rating' type='number' label="Rating" ref={ratingInputRef} isValid={ratingIsValid} />
                    <Input id='date' type='date' label='date' ref={dateInputRef} isValid={dateIsValid} />
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