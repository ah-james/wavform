import React, { useState } from "react"

import styles from './NewAlbum.module.css'
import AlbumForm from "./AlbumForm"
import Button from "../UI/Button"

const NewAlbum = (props) => {
    const [mountForm, setMountForm] = useState(false)
    const [error, setError] = useState(null)

    const handleSaveAlbum = async (review) => {
        try {
            const response = await fetch('https://react-bouncr-default-rtdb.firebaseio.com/reviews.json', {
                method: 'POST',
                body: JSON.stringify(review),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                throw new Error('Something went wrong.')
            }

            const data = await response.json()
            console.log(data)
        } catch (error) {
            setError(error.message)
        }
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
            <Button handleClick={handleClick}>Add an Album</Button>
        </div>
    )


}

export default NewAlbum