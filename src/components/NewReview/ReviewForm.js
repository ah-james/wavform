import React, { useState, useRef } from "react";

import styles from './ReviewForm.module.css'
import ErrorModal from '../UI/ErrorModal'
import Button from "../UI/Button";
import Input from '../UI/Input'

const ReviewForm = props => {
    // can create refs with useRef hook so that state updates when form is submitted
    // using useState here for flexibility
    // one for each input, ref prop in each html input element
    const [artist, setArtist] = useState('')
    const [album, setAlbum] = useState('')
    const [rating, setRating] = useState('')
    const [date, setDate] = useState('')

    // portion of state to deterimine if user input is valid (not empty)
    const [artistIsValid, setArtistIsValid] = useState(true)
    const [albumIsValid, setAlbumIsValid] = useState(true)
    const [ratingIsValid, setRatingIsValid] = useState(true)
    const [dateIsValid, setDateIsValid] = useState(true)

    // portion of state to determine if a component has been touched
    const [artistTouched, setArtistTouched] = useState(false)
    const [albumTouched, setAlbumTouched] = useState(false)
    const [ratingTouched, setRatingTouched] = useState(false)
    const [dateTouched, setDateTouched] = useState(false)
    // state to handle errors
    const [error, setError] = useState()

    // no longer need change handler functions because of refs

    const handleError = () => {
        setError(null)
    }

    const handleArtistChange = event => {
        setArtist(event.target.value)
    }

    const handleAlbumChange = event => {
        setAlbum(event.target.value)
    }

    const handleRatingChange = event => {
        setRating(event.target.value)
    }

    const handleDateChange = event => {
        setDate(event.target.value)
    }

    // create function to handle form submission
    const handleSubmit = event => {
        event.preventDefault()

        setArtistIsValid(true)
        setAlbumIsValid(true)
        setRatingIsValid(true)
        setDateIsValid(true)

        // set everything to touched
        setArtistTouched(true)
        setAlbumTouched(true)
        setRatingTouched(true)
        setDateTouched(true)

        // save current values of input refs and use them in error handling
        const enteredArtist = artist
        const enteredAlbum = album
        const enteredRating = rating
        const enteredDate = date

        if (enteredArtist.length === 0) {
            // set errors
            setError({
                title: 'You missed a spot!',
                message: 'Please enter an artist.'
            })
            setArtistIsValid(false)
            return
        }

        if (enteredAlbum.length === 0) {
            setError({
                title: 'You missed a spot!',
                message: 'Please enter an album.'
            })
            setAlbumIsValid(false)
            return
        }

        if (enteredRating.length === 0) {
            setError({
                title: 'You missed a spot!',
                message: 'Please enter a rating.'
            })
            setRatingIsValid(false)
            return
        }

        if (enteredDate.length === 0) {
            setError({
                title: 'You missed a spot!',
                message: 'Please enter a date.'
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
        setAlbum('')
        setArtist('')
        setRating('')  
        setDate('')
    }

    const invalidArtist = !artistIsValid && artistTouched
    const invalidAlbum = !albumIsValid && albumTouched
    const invalidRating = !ratingIsValid && ratingTouched
    const invalidDate = !dateIsValid && dateTouched

    return(
        <>
            {error && <ErrorModal title={error.title} message={error.message} handleError={handleError} />}
            <form onSubmit={handleSubmit} >
                <div className={styles["new-review-controls"]}>
                    <Input id="artist" type='text' label="Artist" value={artist} onChange={handleArtistChange} isValid={!invalidArtist} />
                    <Input id="album" type='text' label='Album' value={album} onChange={handleAlbumChange} isValid={!invalidAlbum}/>
                    <Input id='rating' type='number' label="Rating" value={rating} onChange={handleRatingChange} isValid={!invalidRating} />
                    <Input id='date' type='date' label='date' value={date} onChange={handleDateChange} isValid={!invalidDate} />
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