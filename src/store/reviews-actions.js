import { reviewActions } from "./reviews-slice";

export const fetchReviews = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch('https://react-bouncr-default-rtdb.firebaseio.com/reviews.json')

            if (!response.ok) {
                throw new Error(`Couldn't fetch review data`)
            }

            const data = await response.json()

            // const loadedReviews = []
    // 
            // for (const key in data) {
            //     loadedReviews.push({
            //         id: key,
            //         artist: data[key].artist,
            //         album: data[key].album,
            //         date: data[key].date,
            //         rating: data[key].rating
            //     })
            // }
            // return loadedReviews
            return data
        }

        try {
            const reviewData = await fetchData()
            dispatch(
                reviewActions.getReviews({
                    reviews: reviewData
                })
            )
        } catch (error) {
            console.log(error)
        }
    }
}