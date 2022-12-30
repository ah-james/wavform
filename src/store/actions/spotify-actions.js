import { spotifyActions } from "../reducers/spotify-slice"

const CLIENT_ID = 'ba847002581743b9975e657bd8ced12b'

export const authorizeSpotify = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch('http://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${process.env.REACT_APP_SPOTIFY_KEY}`
            })

            if (!response.ok) {
                throw new Error(`Couldn't authorize Spotify API`)
            }

            const data = await response.json()
            return data
        }

        try {
            const data = await fetchData()
            // dispatch to spotify-slice
            dispatch(spotifyActions.authorizeSpotify(data))

        } catch (error) {
            console.log(error)
        }
    }
}