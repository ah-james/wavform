import { reviewActions } from "../reducers/reviews-slice";
import { addAlbumArt } from "./spotify-actions";

export const fetchReviews = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch('https://react-bouncr-default-rtdb.firebaseio.com/reviews.json')

            if (!response.ok) {
                throw new Error(`Couldn't fetch review data`)
            }

            const data = await response.json()

            const loadedReviews = Object.entries(data).map((key, value) => ({
                id: key[0],
                artist: key[1].artist,
                album: key[1].album,
                date: key[1].date,
                rating: key[1].rating,
                text: key[1].text,
                user: key[1].user,
                art: key[1].art
            }))

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

export const addReview = (review, accessToken) => {
    return async dispatch => {
        const albumArt = await addAlbumArt(review, accessToken)

        const addData = async () => {
            const response = await fetch('https://react-bouncr-default-rtdb.firebaseio.com/reviews.json', {
                method: 'POST',
                body: JSON.stringify({
                    artist: review.artist,
                    album: review.album,
                    rating: review.rating,
                    date: review.date,
                    text: review.text,
                    user: review.user,
                    art: albumArt
                }),
                headers: { 'Content-Type': 'application/json' }
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
                text: review.text,
                user: review.user,
                art: albumArt
            }

            dispatch(
                reviewActions.addReview(createdReview)
            )
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteReview = (review) => {
    return async dispatch => {
        try {
            const response = await fetch(`https://react-bouncr-default-rtdb.firebaseio.com/reviews/${review}.json`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })

            if (!response.ok) {
                throw new Error('Deleting review failed')
            }

            dispatch(reviewActions.deleteReview(review))
        } catch (error) {
            console.log(error)
        }
    }
}

export const editReview = (review) => {
    return async dispatch => {
        const addData = async () => {
            const response = await fetch(`https://react-bouncr-default-rtdb.firebaseio.com/reviews/${review.id}.json`, {
                method: 'PATCH',
                body: JSON.stringify(review),
                headers: { 'Content-Type': 'application/json' }
            })

            if (!response.ok) {
                throw new Error('Sending new review failed')
            }

            const data = await response.json()
            return data
        }

        try {
            const data = await addData()

            dispatch(
                reviewActions.editReview(data)
            )
        } catch (error) {
            console.log(error)
        }
    }
}