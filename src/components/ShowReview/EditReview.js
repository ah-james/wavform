// libraries
import { useState } from 'react'
import PropTypes from "prop-types";
// UI components
import Card from '../UI/Card'
import Input from '../UI/Input'
import Modal from '../UI/Modal'
// custom hooks
import useInput from '../../hooks/use-input'
// styling
import styles from './EditReview.module.css'

const EditReview = ({handleEditReview, selectedReview}) => {
    const [error, setError] = useState()

    const handleError = () => {
        setError(null)
    }

    const {
        value: rating,
        validValue: validRating,
        hasError: invalidRating,
        handleValueChange: handleRatingChange,
        handleValueBlur: handleRatingBlur,
    } = useInput(value => value.trim() !== '', selectedReview.rating)

    const {
        value: date,
        validValue: validDate,
        hasError: invalidDate,
        handleValueChange: handleDateChange,
        handleValueBlur: handleDateBlur,
    } = useInput(value => value.trim() !== '', selectedReview.date)

    const {
        value: text,
        validValue: validText,
        hasError: invalidText,
        handleValueChange: handleTextChange,
        handleValueBlur: handleTextBlur,
    } = useInput(value => value.trim() !== '', selectedReview.text)

    const today = () => {
        const now = new Date()
        const dateToday = now.toISOString().substring(0, 10)

        return dateToday
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

        if (!validDate) {
            setError({
                title: 'You missed a spot!',
                message: 'Please enter a date.'
            })
            return
        }

        if (!validText) {
            setError({
                title: 'You missed a spot!',
                message: 'Please enter a text.'
            })
            return
        }

        const reviewData = {
            id: selectedReview.id,
            album: selectedReview.album,
            artist: selectedReview.artist,
            rating,
            date,
            text,
            user: selectedReview.user,
            art: selectedReview.art,
        }

        handleEditReview(reviewData)
    }

    if (!selectedReview) {
        return (
            <Card className={styles['show-review']} >
                <h1>No Review Found</h1>
            </Card>
        )
    }

    return (
        <>
            {error && <Modal title={error.title} message={error.message} handleAction={handleError} error={true} />}
            <form id='editForm' onSubmit={handleSubmit}>
                <Card className={styles['show-review']}>
                    <p className={styles['user-info']}>Editing Review by {selectedReview.user}</p>
                    <hr className={styles.rounded} />
                    <div className={styles['image-container']}>
                        <img className={styles.image} alt={selectedReview.album} src={selectedReview.art[1].url} />
                    </div>
                    <div className={styles['album-info']}>
                        <h1>{selectedReview.album}</h1>
                        <h3> by {selectedReview.artist}</h3>
                    </div>
                    <div className={styles['rating-info']}>
                        <Input id="rating" type='number' max={10} min={0} value={rating} onChange={handleRatingChange} onBlur={handleRatingBlur} isValid={!invalidRating} />
                        <h4>/10</h4>
                    </div>
                    <div className={styles['album-info']}>
                        <p className={styles['user-info']}>Listened on</p>
                        <Input id='date' type='date' max={today()} value={date} onChange={handleDateChange} onBlur={handleDateBlur} isValid={!invalidDate} />
                    </div>
                    <div className={`${styles["text-area"]} ${invalidText ? styles.invalid : ''}`}>
                        <textarea id='text' name='text' rows='10' cols='90' value={text} onChange={handleTextChange} onBlur={handleTextBlur}></textarea>
                    </div>
                </Card>
            </form>
        </>
    )
}

EditReview.propTypes = {
    handleEditReview: PropTypes.func, 
    selectedReview: PropTypes.object
}

export default EditReview