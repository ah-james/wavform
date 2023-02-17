// libraries
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'
// UI components
import Card from '../UI/Card'
// styling
import styles from './ReviewItem.module.css'

const ReviewItem = ({id, user, artist, album, art, date, rating}) => {
    const reviewDate = new Date(`${date}T00:00-0800`)

    const month = reviewDate.toLocaleString('en-US', { month: 'long' })
    const day = reviewDate.toLocaleString('en-US', { day: 'numeric' })
    const year = reviewDate.getFullYear()

    const suffix = (day) => {
        if (day > 3 && day < 21) return 'th'
        switch (day % 10) {
            case 1: return 'st'
            case 2: return 'nd'
            case 3: return 'rd'
            default: return 'th'
        }
    }

    return (
        <li key={id}>
            <Link to={`/reviews/${id}`} state={{ creator: user }}>
                <Card className={styles["review-item"]}>
                    <div className={styles["review-description"]}>
                        <img alt={album} src={art[2].url} />
                    </div>
                    <div className={styles["review-item-description"]}>
                        <h2>{artist}</h2>
                        <h2>{album}</h2>
                    </div>
                    <div className={styles['review-date']}>
                        <p>{month} {day}{suffix(day)}, {year}</p>
                    </div>
                    <div className={styles["review-item-info"]}>
                        <p>{rating}/10</p>
                    </div>
                </Card>
            </Link>
        </li>
    )
}

ReviewItem.propTypes = {
    id: PropTypes.string, 
    user: PropTypes.string, 
    artist: PropTypes.string, 
    album: PropTypes.string, 
    art: PropTypes.array, 
    date: PropTypes.string, 
    rating: PropTypes.string
}

export default ReviewItem