import React, { useState } from "react"

import styles from './NewAlbum.module.css'
import AlbumForm from "./AlbumForm"

const NewAlbum = (props) => {
    const [mountForm, setMountForm] = useState(false)

    const handleSaveAlbum = (data) => {
        const savedData = {
            ...data,
            id: Math.random().toString()
        }

        props.onAddAlbum(savedData)
        setMountForm(false)
    }

    const handleClick = () => {
        setMountForm(current => !current)
    }

    if (mountForm) {
        return(
            <div className={styles["new-album"]}>
                <AlbumForm handleClick={handleClick} onSaveAlbum={handleSaveAlbum} />
            </div>
        )
    }

    return (
        <div className={styles['new-album']}>
            <button onClick={handleClick}>Add an Album</button>
        </div>
    )


}

export default NewAlbum