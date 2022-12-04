import { useEffect, useState } from "react"

const CLIENT_ID = 'ba847002581743b9975e657bd8ced12b'

const ArtistSearchContainer = props => {
    const [search, setSearch] = useState('')
    const [accessToken, setAccessToken] = useState('')
    const [albums, setAlbums] = useState([])

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

        const searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }

        const response = await fetch(`https://api.spotify.com/v1/search?q=${search}&type=artist`, searchParameters)
        const artistData = await response.json()
        const artistID =  artistData.artists.items[0].id

        const returnedAlbums = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=25`, searchParameters)
        const albumResponse = await returnedAlbums.json()
        setAlbums(albumResponse.items)
    }


    return(
        <form onSubmit={searchArtists}>
            <input type='text' onChange={event => setSearch(event.target.value)}></input>
            <button type='submit'>Search</button>
            {albums.map(album => 
                <div>
                    <p>{album.name}</p>
                    <img src={album.images[1].url}></img> 
                </div>
            )}
        </form>
    )
}

export default ArtistSearchContainer