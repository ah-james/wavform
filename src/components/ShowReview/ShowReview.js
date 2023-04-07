// libraries
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";
// UI Components
import Card from '../UI/Card'
// styling
import styles from './ShowReview.module.css'

const ShowReview = ({ selectedReview }) => {

    if (!selectedReview) {
        return (
            <Card className={styles['show-review']} >
                <h1>No Review Found</h1>
            </Card>
        )
    }

    return (
        <Card className={styles['show-review']}>
            <Link to={`/user/${selectedReview.user}`}>
                <p className={styles['user-info']}>Review by {selectedReview.user}</p>
            </Link>
            <hr className={styles.rounded} />
            <div>
                <img className={styles.image} alt={selectedReview.album} src={selectedReview.art[1].url} />
            </div>
            <div className={styles['album-info']}>
                <h1>{selectedReview.album}</h1>
                <h3> by {selectedReview.artist}</h3>
            </div>
            <p>{selectedReview.rating}/10</p>
            <p className={styles['listened-info']}>Listened on {selectedReview.date}</p>
            <p>{selectedReview.text}</p>
            <div>
                <p className={styles['user-info']}>comments</p>
                <hr className={styles.rounded} />
            </div>
        </Card>
    )
}

ShowReview.propTypes = {
    selectedReview: PropTypes.object
}

export default ShowReview