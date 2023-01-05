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
                    text: data[key].text,
                    user: data[key].user,
                    art: data[key].art
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

export const addReview = (review, accessToken) => {
    return async dispatch => {
        const addAlbumArt = async () => {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${review.artist}&type=artist`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            })

            const artistData = await response.json()
            const artistId = artistData.artists.items[0].id
            // return albumData.albums.items[0].images

            const artistResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            })

            const albumData = await artistResponse.json()
            const foundAlbum = albumData.items.find(obj => {
                return obj.name === review.album
            })

            return foundAlbum.images
        }

        const albumArt = await addAlbumArt()

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

            dispatch(
                reviewActions.editReview(data)
            )
        } catch (error) {
            console.log(error)
        }
    }
}