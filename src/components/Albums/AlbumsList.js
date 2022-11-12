import AlbumItem from "./AlbumItem"
import './AlbumsList.css'

const AlbumsList = props => {
    // set text shown on page if filteredAlbums is empty
    if (props.albums.length === 0) {
        return <h2 className="albums-list-fallback">No Albums Found</h2>
    }

    return(
        <ul className="albums-list">
            {props.albums.map((filteredReview) => 
            <AlbumItem key={filteredReview.id} artist={filteredReview.artist} album={filteredReview.album} date={filteredReview.date} rating={filteredReview.rating} />
            )}
        </ul>
    )
}

export default AlbumsList