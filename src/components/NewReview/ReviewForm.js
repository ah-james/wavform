import React, { useState } from "react";

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

    // portion of state to determine if a component has been touched
    const [artistTouched, setArtistTouched] = useState(false)
    const [albumTouched, setAlbumTouched] = useState(false)
    const [ratingTouched, setRatingTouched] = useState(false)
    const [dateTouched, setDateTouched] = useState(false)
    // state to handle errors
    const [error, setError] = useState()

    // save validity as constants, check if artist, album, etc .trim doesn't equal empty string, can remove set function calls then
    const validArtist = artist.trim() !== ''
    const validAlbum = album.trim() !== ''
    const validRating = rating.trim() !== ''
    const validDate = date.trim() !== ''

    const invalidArtist = !validArtist && artistTouched
    const invalidAlbum = !validAlbum && albumTouched
    const invalidRating = !validRating && ratingTouched
    const invalidDate = !validDate && dateTouched

    let validForm = false

    if (validAlbum && validArtist && validRating && validDate) {
        validForm = true
    }

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

    const handleArtistBlur = () => {
        setArtistTouched(true)
    }

    const handleAlbumBlur = () => {
        setAlbumTouched(true)
    }

    const handleRatingBlur = () => {
        setRatingTouched(true)
    }

    const handleDateBlur = () => {
        setDateTouched(true)
    }

    // create function to handle form submission
    const handleSubmit = event => {
        event.preventDefault()

        // set everything to touched
        setArtistTouched(true)
        setAlbumTouched(true)
        setRatingTouched(true)
        setDateTouched(true)

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
            date
        }

        props.onSaveReview(reviewData)

        setAlbum('')
        setArtist('')
        setRating('')  
        setDate('')

        setArtistTouched(false)
        setAlbumTouched(false)
        setRatingTouched(false)
        setDateTouched(false)
    }

    return(
        <>
            {error && <ErrorModal title={error.title} message={error.message} handleError={handleError} />}
            <form onSubmit={handleSubmit} >
                <div className={styles["new-review-controls"]}>
                    <Input id="artist" type='text' label="Artist" value={artist} onChange={handleArtistChange} onBlur={handleArtistBlur} isValid={!invalidArtist} />
                    <Input id="album" type='text' label='Album' value={album} onChange={handleAlbumChange} onBlur={handleAlbumBlur} isValid={!invalidAlbum}/>
                    <Input id='rating' type='number' label="Rating" value={rating} onChange={handleRatingChange} onBlur={handleRatingBlur} isValid={!invalidRating} />
                    <Input id='date' type='date' label='date' value={date} onChange={handleDateChange} onBlur={handleDateBlur} isValid={!invalidDate} />
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