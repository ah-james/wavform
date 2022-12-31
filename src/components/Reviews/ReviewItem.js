import { Link } from 'react-router-dom'

import styles from './ReviewItem.module.css'
import Card from '../UI/Card'

const ReviewItem = props => {
    const date = new Date(`${props.date}T00:00-0800`)

    const month = date.toLocaleString('en-US', { month: 'long' })
    const day = date.toLocaleString('en-US', { day: 'numeric' })
    const year = date.getFullYear()

    const suffix = (day) => {
        if (day > 3 && day < 21) return 'th'
        switch (day % 10) {
            case 1: return 'st'
            case 2: return 'nd'
            case 3: return 'rd'
            default: return 'th'
        }
    }

    return(
        <li key={props.id}>
            <Link to={`/reviews/${props.id}`} state={{ creator: props.user }}>
                <Card className={styles["review-item"]}>
                    <div className={styles["review-description"]}>
                        <img alt={props.album} src={props.art[2].url} />
                    </div>
                    <div className={styles["review-item-description"]}>
                        <h2>{props.artist}</h2>
                        <h2>{props.album}</h2>
                    </div>
                    <div className={styles['review-date']}>
                        <p>Listened on {month} {day}{suffix(day)}, {year}</p>
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