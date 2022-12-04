

const ArtistSearchContainer = props => {

    // adding fetch request for spotify api to get albums
    const searchArtists = (event) => {
        fetch('https://api.spotify.com/v1/search')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            const transformedAlbums = data.albums.map(albumData => {
            return {
                id: albumData.id,
                album: albumData.name,
                artist: albumData.artists.name,
            }
            })
            console.log(data.results)
        })
    }


    return(
        <form onSubmit={searchArtists}>
            <input type='text' onChange={event => setSearch(event.target.value)}></input>
            <button type='submit'>Search</button>
        </form>
    )
}