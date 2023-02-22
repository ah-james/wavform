// libraries
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import RecentReviewsList from '../components/Home/RecentReviewsList'
// UI components
import Button from '../components/UI/Button'
// styling
import styles from './Container.module.css'

const HomeContainer = () => {
    const navigate = useNavigate()

    const reviews = useSelector((state) => {
        return state.reviews.albums
    })

    const recentReviews = reviews.slice(-4)

    const backgroundArt = reviews.map(review => {
        return review.art[0].url
    })

    return (
        <>
            <div className={styles['center-text']}>
                <h2>Track albums you've listened to.</h2>
                <h2>Save those you haven't heard yet.</h2>
                <h2>Tell your friends what's good.</h2>
                <Button handleClick={() => navigate('/signup')}>Get Started - It's Free!</Button>
            </div>
            <div>
                <RecentReviewsList reviews={recentReviews} />
            </div>
        </>

    )
}

export default HomeContainer