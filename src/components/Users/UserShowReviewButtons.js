import Button from '../UI/Button'
import styles from './Settings.module.css'

const UserShowReviewButtons = props => {
    return (
        <div className={styles.buttons}>
            {props.user && !props.editing && <Button destroy={true} handleClick={props.beginDeleteReview}>Delete Review</Button>}
            {props.user && <Button handleClick={props.mountReviewForm}>{props.editing ? 'Cancel' : 'Edit Review'}</Button>}
            {props.user && props.editing && <Button form='editForm' type='submit'>Submit</Button>}
        </div>
    )
}

export default UserShowReviewButtons