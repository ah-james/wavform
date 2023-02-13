const FindAlbumDatalist = ({query, options}) => {
    return (
        <datalist id='albums'>
            {query.length > 0 && options?.map((album, id) => {
                return <option key={id}>{album.name} by {album.artists[0].name}</option>
            })}
        </datalist>
    )
}

export default FindAlbumDatalist