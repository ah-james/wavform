import { reviewActions } from "../reducers/reviews-slice";

export const fetchReviews = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch('https://react-bouncr-default-rtdb.firebaseio.com/reviews.json')

            if (!response.ok) {
                throw new Error(`Couldn't fetch review data`)
            }

            const data = await response.json()

            const loadedReviews = []
    
            for (const key in data) {
                loadedReviews.push({
                    id: key,
                    artist: data[key].artist,
                    album: data[key].album,
                    date: data[key].date,
                    rating: data[key].rating,
                    user: data[key].user
                })
            }
            return loadedReviews
        }

        try {
            const reviewData = await fetchData()
            dispatch(
                reviewActions.getReviews(reviewData)
            )
        } catch (error) {
            console.log(error)
        }
    }
}

export const addReview = (review) => {
    return async dispatch => {
        const addData = async () => {
            const response = await fetch('https://react-bouncr-default-rtdb.firebaseio.com/reviews.json', {
                method: 'POST',
                body: JSON.stringify(review),
                headers: {'Content-Type': 'application/json'}
            })

            if (!response.ok) {
                throw new Error('Sending new review failed')
            }

            const data = await response.json()
            return data
        }

        try {
            const data = await addData()

            const createdReview = {
                id: data.name,
                artist: review.artist,
                album: review.album,
                date: review.date,
                rating: review.rating,
                user: review.user
            }

            dispatch(
                reviewActions.addReview(createdReview)
            )
        } catch (error) {
            console.log(error)
        }
    }
}