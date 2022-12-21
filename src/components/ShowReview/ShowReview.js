import Card from '../UI/Card'
import styles from './ShowReview.module.css'


const ShowReview = props => {
    
    if (!props.selectedReview) {
        return <h1>No Review Found</h1>
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