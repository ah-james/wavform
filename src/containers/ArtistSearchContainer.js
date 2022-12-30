import { useState } from "react"
import { useSelector } from "react-redux"

const ArtistSearchContainer = () => {
    const [search, setSearch] = useState('')
    // const [albums, setAlbums] = useState([])
    const [albums, setAlbums] = useState()
    // bit of state to check if content is currently loading, starting false
    const [loading, setLoading] = useState(false)
    // error state to handle HTTP errors
    const [error, setError] = useState(null)

    const accessToken = useSelector(state => {
        return state.spotify.accessToken
    })

    // adding fetch request for spotify api to get albums
    async function searchArtists(event) {
        event.preventDefault()
        // setLoading to true
        setLoading(true)
        // reset errors to null
        setError(null)

        const searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }

        try {
            // GET an artist via search
            // const response = await fetch(`https://api.spotify.com/v1/search?q=${search}&type=artist`, searchParameters)
            const response = await fetch(`https://api.spotify.com/v1/search?q=${search}&type=album`, searchParameters)

            // if the response fails throw a new error
            if (!response.ok) {
                throw new Error('Something went wrong')
            }
            // const artistData = await response.json()
            const albumData = await response.json()

            // want to eventually have a suggestion box that autofills when user starts typing, for now use top artist ID
            // ID not name to add to string to find artist's albums
            // const artistID = artistData.artists.items[0].id
            const albumID = albumData.albums.items[0].id

            // GET all albums by an artist
            // const returnedAlbums = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`, searchParameters)
            const returnedAlbum = await fetch(`https://api.spotify.com/v1/albums/${albumID}/`, searchParameters)
            // const albumResponse = await returnedAlbums.json()
            const albumResponse = await returnedAlbum.json()
            setAlbums(albumResponse)

        } catch (error) {
            setError(error.message)
        }
        // setLoading to false
        setLoading(false)
    }

    let content = <p>No Albums Found</p>

    if (loading) {
        content = <p>Loading...</p>
    }

    if (error) {
        content = <p>{error}</p>
    }

    // if (albums.length > 0) {
    //     content = albums.map(
    //         album => 
    //         <div key={album.id}>
    //             <p style={{color: 'white'}}>{album.name}</p>
    //             <img alt={album.name} src={album.images[1].url}></img> 
    //         </div>
    //     )
    // }

    if (albums) {
        content =
            <div key={albums.id}>
                <p style={{color: 'white'}}>{albums.name}</p>
                <img alt={albums.name} src={albums.images[1].url}></img> 
            </div>
    }

    return(
        <form onSubmit={searchArtists}>
            <input type='text' onChange={event => setSearch(event.target.value)}></input>
            <button type='submit'>Search</button>
            <div>{content}</div>
        </form>
    )
}

export default ArtistSearchContainer