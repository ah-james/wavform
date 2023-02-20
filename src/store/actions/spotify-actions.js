import { spotifyActions } from "../reducers/spotify-slice"

const CLIENT_ID = 'ba847002581743b9975e657bd8ced12b'

export const authorizeSpotify = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch('https://accounts.spotify.com/api/token', {
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

export const addAlbumArt = async (review, accessToken) => {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${review.artist}&type=artist`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })

    const artistData = await response.json()
    const artistId = artistData.artists.items[0].id

    const artistResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })


    try {
        const albumData = await artistResponse.json()
        const foundAlbum = albumData.items.find(obj => {
            return obj.name === review.album
        })

        return foundAlbum.images
    } catch (error) {
        alert(error)
    }

}

const populateDatalist = async (query, accessToken) => {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=album&limit=5`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })

    if (!response.ok) {
        throw new Error(`Couldn't fetch albums data`)
    }

    const data = await response.json()

    return data.albums.items
}