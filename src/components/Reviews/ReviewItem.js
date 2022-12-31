import { Link } from 'react-router-dom'

import styles from './ReviewItem.module.css'
import Card from '../UI/Card'

// to do
// move listened date under artist and title
// replace date box with album art Spotify API
const ReviewItem = props => {
    const date = new Date(`${props.date}T00:00-0800`)

    const month = date.toLocaleString('en-US', { month: 'long' })
    const day = date.toLocaleString('en-US', { day: '2-digit' })
    const year = date.getFullYear()

    return(
        <li key={props.id}>
            <Link to={`/reviews/${props.id}`} state={{ creator: props.user }}>
                <Card className={styles["review-item"]}>
                    <div className={styles["review-description"]}>
                        {/* <div className="review-month">{month}</div>
                        <div className="review-day">{day}</div>
                        <div className="review-year">{year}</div> */}
                        <img alt={props.album} src={props.art[2].url} />
                    </div>
                    <div className={styles["review-item-description"]}>
                        <h2>{props.artist}</h2>
                        <h2>{props.album}</h2>
                    </div>
                    <div className={styles["review-item-info"]}>
                        <p>{props.rating}/10</p>
                    </div>
                </Card>
            </Link>
        </li>
    )
}

export default ReviewItem