import './AlbumItem.css'

const AlbumItem = props => {
    const year = props.year.getFullYear()

    return(
        <div className="album-item">
            <div className="album-item-description">
                <h4>{props.artist}</h4>
                <h4>{props.album}</h4>
            </div>
            <div className="album-item-info">
                <p>{year}</p>
                <p>{props.rating}</p>
            </div>
        </div>
    )
}

export default AlbumItem