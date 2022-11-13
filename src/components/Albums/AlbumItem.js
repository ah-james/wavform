import styles from './AlbumItem.module.css'
import Card from '../UI/Card'

const AlbumItem = props => {

    const month = props.date.toLocaleString('en-US', { month: 'long' })
    const day = props.date.toLocaleString('en-US', { day: '2-digit' })
    const year = props.date.getFullYear()

    return(
        <li>
            <Card className={styles["album-item"]}>
                <div className={styles["album-description"]}>
                    <div className="album-month">{month}</div>
                    <div className="album-day">{day}</div>
                    <div className="album-year">{year}</div>
                </div>
                <div className={styles["album-item-description"]}>
                    <h2>{props.artist}</h2>
                    <h2>{props.album}</h2>
                </div>
                <div className={styles["album-item-info"]}>
                    <p>{props.rating}/10</p>
                </div>
            </Card>
        </li>
    )
}

export default AlbumItem