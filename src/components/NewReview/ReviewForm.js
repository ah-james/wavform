// libraries
import React, { useState } from "react";
import { useSelector } from "react-redux";
// UI components
import Modal from '../UI/Modal'
import Button from "../UI/Button";
import Input from '../UI/Input'
// custom hooks
import useInput from "../../hooks/use-input";
// styling
import styles from './ReviewForm.module.css'

// to do:
// link with Spotify API to include artist and album dropdown
const ReviewForm = ({handleClick, onSaveReview, artist, album}) => {
    const [error, setError] = useState()

    const user = useSelector(state => {
        return state.auth.email
    })

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
        handleValueChange: handleDateChange,
        handleValueBlur: handleDateBlur,
        reset: resetDate
    } = useInput(value => value.trim() !== '')



    const {
        value: text,
        validValue: validText,
        hasError: invalidText,
        handleValueChange: handleTextChange,
        handleValueBlur: handleTextBlur,
        reset: resetText
    } = useInput(value => value.trim() !== '')

    let validForm = false

    if (validRating && validText) {
        validForm = true
    }

    const handleError = () => {
        setError(null)
    }

    const handleSubmit = event => {
        event.preventDefault()

        if (!validRating) {
            setError({
                title: 'You missed a spot!',
                message: 'Please enter a rating.'
            })
            return
        }

        const reviewData = {
            artist: artist,
            album: album,
            rating,
            date: setDate,
            text,
            user,
            art: null
        }

        onSaveReview(reviewData)

        resetRating()
        resetDate()
        resetText()
    }

    const today = () => {
        const now = new Date()
        const dateToday = now.toISOString().substring(0, 10)

        return dateToday
    }

    let setDate = date

    if (!setDate) {
        setDate = today()
    }

    return (
        <>
            {error && <Modal title={error.title} message={error.message} handleAction={handleError} error={true} />}
            {/* readd on onFocus={handleFormFocus} after fixing */}
            <form onSubmit={handleSubmit} >
                <div className={styles["new-review-controls"]}>
                    <Input id="artist" type='text' label="Artist" value={artist} readonly={true} />
                    <Input id="album" type='text' label='Album' value={album} readonly={true} />
                    <Input id='rating' type='number' label="Rating" value={rating} onChange={handleRatingChange} onBlur={handleRatingBlur} isValid={!invalidRating} />
                    <Input id='date' type='date' label='Listened On' max={today()} value={setDate} onChange={handleDateChange} onBlur={handleDateBlur} />
                </div>
                <div className={`${styles["new-review-control"]} ${invalidText ? styles.invalid : ''}`}>
                    <label htmlFor='text'>Review</label>
                    <textarea id='text' name='text' rows='10' cols='70' value={text} onChange={handleTextChange} onBlur={handleTextBlur}></textarea>
                </div>
                <div className={styles["new-review-actions"]}>
                    <Button type='button' handleClick={handleClick}>Cancel</Button>
                    <Button type="submit" disabled={!validForm}>Add Review</Button>
                </div>
            </form>
        </>
    )
}

export default ReviewForm