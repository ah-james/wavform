import React, { useState } from "react";

import styles from './ReviewForm.module.css'
import ErrorModal from '../UI/ErrorModal'
import Button from "../UI/Button";
import Input from '../UI/Input'

import useInput from "../../hooks/use-input";
import { useSelector } from "react-redux";

// to-do:
// link with Spotify API to include artist and album dropdown
// add review text body to form
const ReviewForm = props => {
    // const [focusedForm, setFocusedForm] = useState(false)
    const user = useSelector(state => {
        return state.auth.email
    })

    // use custom hook to dry up code, destructure out values and functions
    const { 
        value: artist, 
        validValue: validArtist, 
        hasError: invalidArtist, 
        handleValueChange: handleArtistChange, 
        handleValueBlur: handleArtistBlur, 
        reset: resetArtist 
    } = useInput(value => value.trim() !== '')

    const {
        value: album, 
        validValue: validAlbum, 
        hasError: invalidAlbum,
        handleValueChange: handleAlbumChange, 
        handleValueBlur: handleAlbumBlur, 
        reset: resetAlbum 
    } = useInput(value => value.trim() !== '')

    const {
        value: rating, 
        validValue: validRating, 
        hasError: invalidRating, 
        handleValueChange: handleRatingChange, 
        handleValueBlur: handleRatingBlur, 
        reset: resetRating 
    } = useInput(value => value.trim() !== '' && value >= 0 && value <= 10)

    const {
        value: date, 
        validValue: validDate, 
        hasError: invalidDate, 
        handleValueChange: handleDateChange, 
        handleValueBlur: handleDateBlur, 
        reset: resetDate 
    } = useInput(value => value.trim() !== '')

    // state to handle errors
    const [error, setError] = useState()

    let validForm = false

    if (validAlbum && validArtist && validRating && validDate) {
        validForm = true
    }

    const handleError = () => {
        setError(null)
    }

    // create function to handle form submission
    const handleSubmit = event => {
        event.preventDefault()

        if (!validArtist) {
            setError({
                title: 'You missed a spot!',
                message: 'Please enter an artist.'
            })
            return
        }

        if (!validAlbum) {
            setError({
                title: 'You missed a spot!',
                message: 'Please enter an album.'
            })
            return
        }

        if (!validRating) {
            setError({
                title: 'You missed a spot!',
                message: 'Please enter a rating.'
            })
            return
        }

        if (!validDate) {
            setError({
                title: 'You missed a spot!',
                message: 'Please enter a date.'
            })
            return
        }

        const reviewData = {
            artist,
            album,
            rating,
            date, 
            user
        }

        props.onSaveReview(reviewData)

        resetArtist()
        resetAlbum()
        resetRating()
        resetDate()
    }

    const today = () => {
        const now = new Date()
        const dateToday = now.toISOString().substring(0, 10)

        return dateToday
    }

    return(
        <>
        {/* Prompt was removed in version 6, add back in or create a custom hook later */}
            {/* <Prompt when={focusedForm} message={(location) => 'Are you sure you want to leave before submitting?'} /> */}
            {error && <ErrorModal title={error.title} message={error.message} handleError={handleError} />}
            {/* readd on onFocus={handleFormFocus} after fixing */}
            <form onSubmit={handleSubmit} >
                <div className={styles["new-review-controls"]}>
                    <Input id="artist" type='text' label="Artist" value={artist} onChange={handleArtistChange} onBlur={handleArtistBlur} isValid={!invalidArtist} />
                    <Input id="album" type='text' label='Album' value={album} onChange={handleAlbumChange} onBlur={handleAlbumBlur} isValid={!invalidAlbum}/>
                    <Input id='rating' type='number' label="Rating" value={rating} onChange={handleRatingChange} onBlur={handleRatingBlur} isValid={!invalidRating} />
                    <Input id='date' type='date' label='date' max={today()} value={date} onChange={handleDateChange} onBlur={handleDateBlur} isValid={!invalidDate} />
                </div>
                <div className={styles["new-review-actions"]}>
                    <Button type='button' handleClick={props.handleClick}>Cancel</Button>
                    <Button type="submit" disabled={!validForm}>Add Review</Button>
                </div>
            </form>
        </>
    )
}

export default ReviewForm