import Card from '../UI/Card'
import styles from './ShowReview.module.css'

// to do
// add album art by fetching to spotify
// navigate to author's reviews when click on name
const ShowReview = props => {
    
    if (!props.selectedReview) {
        return (
            <Card className={styles['show-review']} >
                <h1>No Review Found</h1>
            </Card>
        )
    }

    return(
        <Card className={styles['show-review']}>
            <p className={styles['user-info']}>Review by {props.selectedReview.user}</p>
            <hr className={styles.rounded} />
            <div className={styles['album-info']}>
                <h1>{props.selectedReview.album}</h1>
                <h3> by {props.selectedReview.artist}</h3>
            </div>
            <p>{props.selectedReview.rating}/10</p>
            <p className={styles['user-info']}>Listened on {props.selectedReview.date}</p>
            <p>{props.selectedReview.text}</p>
        </Card>
    )
}

export default ShowReview