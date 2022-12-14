import { Link } from 'react-router-dom'

import styles from './ReviewItem.module.css'
import Card from '../UI/Card'

const ReviewItem = props => {
    const date = new Date(props.date)

    const month = date.toLocaleString('en-US', { month: 'long' })
    const day = date.toLocaleString('en-US', { day: '2-digit' })
    const year = date.getFullYear()

    return(
        <li>
            <Card className={styles["review-item"]}>
                <div className={styles["review-description"]}>
                    <div className="review-month">{month}</div>
                    <div className="review-day">{day}</div>
                    <div className="review-year">{year}</div>
                </div>
                <div className={styles["review-item-description"]}>
                    <h2>{props.artist}</h2>
                    <Link to={`/reviews/${props.id}`}>{props.album}</Link>
                </div>
                <div className={styles["review-item-info"]}>
                    <p>{props.rating}/10</p>
                </div>
            </Card>
        </li>
    )
}

export default ReviewItem