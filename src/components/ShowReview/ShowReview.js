// libraries
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";
// Components
import CommentsForm from '../Comments/CommentsForm';
// UI Components
import Card from '../UI/Card'
// styling
import styles from './ShowReview.module.css'
import { useSelector } from 'react-redux';

const ShowReview = ({ selectedReview }) => {
    const accessToken = useSelector(state => state.spotify.accessToken)

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
            <Link to={`/album/${selectedReview.album}`} state={{ accessToken: accessToken, albumId: selectedReview.albumId }}>
                <div className={styles['album-info']}>
                    <h1>{selectedReview.album}</h1>
                    <h3> by {selectedReview.artist}</h3>
                </div>
            </Link>
            <div>{selectedReview.rating}/10</div>
            <div className={styles['listened-info']}>Listened on {selectedReview.date}</div>
            <p className={styles['review-text']}>{selectedReview.text}</p>
            <CommentsForm id={selectedReview.id} />
        </Card>
    )
}

ShowReview.propTypes = {
    selectedReview: PropTypes.object
}

export default ShowReview