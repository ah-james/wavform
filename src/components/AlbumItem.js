import './AlbumItem.css'

const AlbumItem = props => {
    return(
        <div className="album-item">
            <div className="album-item-description">
                <h4>Artist Name</h4>
                <h4>Album Title</h4>
            </div>
            <div className="album-item-info">
                <p>release year</p>
                <p>rating</p>
            </div>
        </div>
    )
}

export default AlbumItem