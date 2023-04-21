// libraries
import { useSelector } from 'react-redux'
// components
import NewReview from '../components/NewReview/NewReview';
import Reviews from '../components/Reviews/Reviews';
// styling
import styles from '../components/Reviews/ReviewsList.module.css'

const ProfileContainer = () => {
    const reviews = useSelector((state) => state.reviews.albums)

    const user = useSelector((state) => state.auth.email)

    const shownReviews = reviews.filter(review => review.user === user)

    let content = <p className={styles["reviews-list-fallback"]}>Loading...</p>

    // I'll figure this out someday \/

    // if (error) {
    //   content = <p className={styles["reviews-list-fallback"]}>{error}</p>
    // }

    // if (loading) {
    //   content = <p className={styles["reviews-list-fallback"]}>Loading...</p>
    // }

    if (reviews.length > 0) {
        content = <Reviews reviews={user ? shownReviews : reviews} showChart={true} />
    }

    return (
        <div>
            <NewReview />
            {content}
        </div>
    )
}

export default ProfileContainer