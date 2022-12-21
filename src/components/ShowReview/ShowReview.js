import Card from '../UI/Card'
import styles from './ShowReview.module.css'

// to do
// add album art by fetching to spotify
// add author name along with review text body once that's added to form component
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
            <h1>{props.selectedReview.album}</h1>
            <h3>by {props.selectedReview.artist}</h3>
            <p>{props.selectedReview.rating}/10</p>
        </Card>
    )
}

export default ShowReview