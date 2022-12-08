import React, { useState } from "react"

import styles from './NewReview.module.css'
import ReviewForm from "./ReviewForm"
import Button from "../UI/Button"
import useHttp from "../../hooks/use-http"

const NewReview = (props) => {
    // useHttp hook here destructured to bring out loading error and sendRequest
    const { loading, error, sendRequest } = useHttp()

    const [mountForm, setMountForm] = useState(false)

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
            <div className={styles["new-review"]}>
                <ReviewForm handleClick={handleClick} onSaveAlbum={handleSaveAlbum} />
            </div>
        )
    }

    return (
        <div className={styles['new-review']}>
            <Button handleClick={handleClick}>Add an Album</Button>
        </div>
    )


}

export default NewReview