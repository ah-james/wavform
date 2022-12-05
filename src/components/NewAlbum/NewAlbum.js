import React, { useState } from "react"

import styles from './NewAlbum.module.css'
import AlbumForm from "./AlbumForm"
import Button from "../UI/Button"

const NewAlbum = (props) => {
    const [mountForm, setMountForm] = useState(false)

    const handleSaveAlbum = async (review) => {
        // const savedData = {
        //     ...review,
        //     id: Math.random().toString()
        // }

        // props.onAddReview(savedData)
        // setMountForm(false)

        const response = await fetch('https://react-bouncr-default-rtdb.firebaseio.com/reviews.json', {
            method: 'POST',
            body: JSON.stringify(review),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data)
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