import { useEffect, useState } from "react"

const CLIENT_ID = 'ba847002581743b9975e657bd8ced12b'

const ArtistSearchContainer = props => {
    const [search, setSearch] = useState('')
    const [accessToken, setAccessToken] = useState('')
    const [albums, setAlbums] = useState([])
    // bit of state to check if content is currently loading, starting false
    const [loading, setLoading] = useState(false)
    // error state to handle HTTP errors
    const [error, setError] = useState(null)

    // Spotify API requires specific parameters for an access token to use their API, run that when component loads
    useEffect(() => {
        const authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${process.env.REACT_APP_SPOTIFY_KEY}`
        }

        fetch('http://accounts.spotify.com/api/token', authParameters)
        .then(result => result.json())
        .then(data => setAccessToken(data.access_token))
    }, [])


    // adding fetch request for spotify api to get albums
    async function searchArtists(event) {
        event.preventDefault()
        // setLoading to true
        setLoading(true)
        // reset errors to null

        const searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }

        try {
            // GET an artist via search
            const response = await fetch(`https://api.spotify.com/v1/search?q=${search}&type=artist`, searchParameters)

            // if the response fails throw a new error
            if (!response.ok) {
                throw new Error('Something went wrong')
            }
            const artistData = await response.json()

            // want to eventually have a suggestion box that autofills when user starts typing, for now use top artist ID
            // ID not name to add to string to find artist's albums
            const artistID =  artistData.artists.items[0].id

            // GET all albums by an artist
            const returnedAlbums = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`, searchParameters)
            const albumResponse = await returnedAlbums.json()
            setAlbums(albumResponse.items)

        } catch (error) {
            setError(error.message)
        }
        // setLoading to false
        setLoading(false)
    }


    return(
        <form onSubmit={searchArtists}>
            <input type='text' onChange={event => setSearch(event.target.value)}></input>
            <button type='submit'>Search</button>
            {!loading && albums.length === 0 && !error && <p>No Albums Found</p>}
            {loading && <p>Loading...</p>}
            {!loading && error && <p>{error}</p>}
            {albums.map(album => 
                <div key={album.id}>
                    <p>{album.name}</p>
                    <img src={album.images[1].url}></img> 
                </div>
            )}
        </form>
    )
}

export default ArtistSearchContainer