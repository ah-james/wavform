//library
import { Link } from "react-router-dom"
// styling
import styles from './RecentReviewsList.module.css'

const RecentAlbumCard = ({review}) => {

    return (
        <li className={styles.container} key={review.id} >
            <Link to={`/reviews/${review.id}`} state={{ creator: review.user }}>
                <img alt={review.album} src={review.art[1].url} className={styles.image} />
                <div className={styles.overlay}>
                    <div className={styles.text}>
                        <h2>{review.artist}</h2>
                        <h3>{review.album}</h3>
                        <p>{review.rating}/10</p>
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default RecentAlbumCard