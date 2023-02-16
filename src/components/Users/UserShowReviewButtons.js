// libraries
import PropTypes from "prop-types";
// UI components
import Button from '../UI/Button'
// styling
import styles from './Settings.module.css'

const UserShowReviewButtons = ({user, editing, beginDeleteReview, mountReviewForm}) => {
    return (
        <div className={styles.buttons}>
            {user && !editing && <Button destroy={true} handleClick={beginDeleteReview}>Delete Review</Button>}
            {user && <Button handleClick={mountReviewForm}>{editing ? 'Cancel' : 'Edit Review'}</Button>}
            {user && editing && <Button form='editForm' type='submit'>Submit</Button>}
        </div>
    )
}

UserShowReviewButtons.propTypes = {
    user: PropTypes.object,
    editing: PropTypes.bool,
    beginDeleteReview: PropTypes.func,
    mountReviewForm: PropTypes.func
}

export default UserShowReviewButtons