import React from "react"

import './NewAlbum.css'
import AlbumForm from "./AlbumForm"

const NewAlbum = (props) => {
    const handleSaveAlbum = (data) => {
        const savedData = {
            ...data,
            id: Math.random().toString()
        }

        props.onAddAlbum(savedData)
    }

    return(
        <div className="new-album">
            <AlbumForm onSaveAlbum={handleSaveAlbum} />
        </div>
    )
}

export default NewAlbum