import React from "react"

import './NewAlbum.css'
import AlbumForm from "./AlbumForm"

const NewAlbum = props => {

    return(
        <div className="new-album">
            <AlbumForm />
        </div>
    )
}

export default NewAlbum