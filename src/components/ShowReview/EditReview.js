import Card from '../UI/Card'
import Input from '../UI/Input'
import styles from './ShowReview.module.css'

// to do
// add album art by fetching to spotify
// navigate to author's reviews when click on name
const EditReview = props => {
    
    if (!props.selectedReview) {
        return (
            <Card className={styles['show-review']} >
                <h1>No Review Found</h1>
            </Card>
        )
    }

    const today = () => {
        const now = new Date()
        const dateToday = now.toISOString().substring(0, 10)

        return dateToday
    }

    const handleSubmit = event => {
        event.preventDefault()
        console.log('submitted')
    }

    // <Input id='date' type='date' max={today()} value={props.selectedReview.date} />
    return(
        <form onSubmit={handleSubmit}>
            <Card className={styles['show-review']}>
                <p className={styles['user-info']}>Editing Review by {props.selectedReview.user}</p>
                <hr className={styles.rounded} />
                <div className={styles['album-info']}>
                    <Input id="album" type='text' value={props.selectedReview.album} />
                    <label>by</label>
                    <Input id="artist" type='text' value={props.selectedReview.artist} />
                </div>
                <Input id="rating" type='number' value={props.selectedReview.rating} />
                <p>/10</p>
                <p className={styles['user-info']}>Listened on</p>
                <Input id='date' type='date' max={today()} value={props.selectedReview.date} />
                <textarea id='text' name='text' rows='10' cols='70' value={props.selectedReview.text}></textarea>
            </Card>
        </form>

    )
}

export default EditReview