import { useSelector } from 'react-redux'

import NewReview from '../components/NewReview/NewReview';
import Reviews from '../components/Reviews/Reviews';

import styles from '../components/Reviews/ReviewsList.module.css'


// to do:
// only show reviews with user ID here
const ProfileContainer = () => {
    const reviews = useSelector((state) => {
        return state.reviews.albums
    })

    const user = useSelector((state) => {
        return state.auth.email
    })

    let shownReviews = []

    if (user) {
        for (let i = 0; i < reviews.length; i++) {
            if (reviews[i]['user'] === user) {
                shownReviews.push(reviews[i])
            }
        }
    }

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