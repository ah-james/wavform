// libraries
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
// UI components
import Button from '../components/UI/Button'
// styling
import styles from './Container.module.css'

const HomeContainer = () => {
    const navigate = useNavigate()

    const reviews = useSelector((state) => {
        return state.reviews.albums.slice(-4)
    })

    return (
        <div className={styles['center-text']}>
            <h2>Track albums you've listened to.</h2>
            <h2>Save those you haven't heard yet.</h2>
            <h2>Tell your friends what's good.</h2>
            <Button handleClick={() => navigate('/signup')}>Get Started - It's Free!</Button>
            <h2>Recent Reviews</h2>
            <div className={styles.images}>
                {reviews.map((review) => 
                    <Link key={review.id} to={`/reviews/${review.id}`} state={{ creator: review.user }}><img alt={review.album} src={review.art[1].url} /></Link>
                )}
            </div>
        </div>
    )
}

export default HomeContainer