import useInput from '../../hooks/use-input'
import Card from '../UI/Card'
import Input from '../UI/Input'
import styles from './ShowReview.module.css'

// to do
// add album art by fetching to spotify
// navigate to author's reviews when click on name
const EditReview = props => {


    const { 
        value: album, 
        // validValue: validAlbum, 
        // hasError: invalidAlbum, 
        handleValueChange: handleAlbumChange, 
        handleValueBlur: handleAlbumBlur, 
        // reset: resetAlbum 
    } = useInput(value => value.trim() !== '', props.selectedReview.album)

    const { 
        value: artist, 
        // validValue: validArtist, 
        // hasError: invalidArtist, 
        handleValueChange: handleArtistChange, 
        handleValueBlur: handleArtistBlur, 
        // reset: resetArtist 
    } = useInput(value => value.trim() !== '', props.selectedReview.artist)

    const { 
        value: rating, 
        // validValue: validRating, 
        // hasError: invalidRating, 
        handleValueChange: handleRatingChange, 
        handleValueBlur: handleRatingBlur, 
        // reset: resetRating 
    } = useInput(value => value.trim() !== '', props.selectedReview.rating)

    const { 
        value: date, 
        // validValue: validDate, 
        // hasError: invalidDate, 
        handleValueChange: handleDateChange, 
        handleValueBlur: handleDateBlur, 
        // reset: resetDate 
    } = useInput(value => value.trim() !== '', props.selectedReview.date)

    const { 
        value: text, 
        // validValue: validText, 
        // hasError: invalidText, 
        handleValueChange: handleTextChange, 
        handleValueBlur: handleTextBlur, 
        // reset: resetText 
    } = useInput(value => value.trim() !== '', props.selectedReview.text)

    const today = () => {
        const now = new Date()
        const dateToday = now.toISOString().substring(0, 10)

        return dateToday
    }

    const handleSubmit = event => {
        event.preventDefault()

        const reviewData = {
            id: props.selectedReview.id,
            album,
            artist,
            rating,
            date,
            text,
            user: props.selectedReview.user
        }

        props.handleEditReview(reviewData)
    }
        
    if (!props.selectedReview) {
        return (
            <Card className={styles['show-review']} >
                <h1>No Review Found</h1>
            </Card>
        )
    }

    return(
        <form id='editForm' onSubmit={handleSubmit}>
            <Card className={styles['show-review']}>
                <p className={styles['user-info']}>Editing Review by {props.selectedReview.user}</p>
                <hr className={styles.rounded} />
                <div className={styles['album-info']}>
                    <Input id="album" type='text' value={album} onChange={handleAlbumChange} onBlur={handleAlbumBlur} />
                    <label>by</label>
                    <Input id="artist" type='text' value={artist} onChange={handleArtistChange} onBlur={handleArtistBlur} />
                </div>
                <Input id="rating" type='number' value={rating} onChange={handleRatingChange} onBlur={handleRatingBlur} />
                <p>/10</p>
                <p className={styles['user-info']}>Listened on</p>
                <Input id='date' type='date' max={today()} value={date} onChange={handleDateChange} onBlur={handleDateBlur} />
                <textarea id='text' name='text' rows='10' cols='70' value={text} onChange={handleTextChange} onBlur={handleTextBlur}></textarea>
            </Card>
        </form>

    )
}

export default EditReview