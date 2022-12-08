import React, { useState } from "react"

import styles from './NewReview.module.css'
import ReviewForm from "./ReviewForm"
import Button from "../UI/Button"
import useHttp from "../../hooks/use-http"

const NewReview = (props) => {
    // useHttp hook here destructured to bring out loading error and sendRequest
    const { sendRequest } = useHttp()

    const [mountForm, setMountForm] = useState(false)

    const createReview = (review, reviewName) => {
        const id = reviewName.name
        const createdReview= {
            id: id,
            artist: review.artist,
            album: review.album,
            date: review.date,
            rating: review.rating
        }
        props.onAddReview(createdReview)
    }

    const handleSaveReview = async (review) => {

        // toss sendRequest into here, accepts URL, method, post, body, then function with what to do with data
        sendRequest({
            url: 'https://react-bouncr-default-rtdb.firebaseio.com/reviews.json', 
            method: 'POST', 
            body: review, 
            headers: {
                'Content-Type': 'application/json'
            }
        }, createReview.bind(null, review))
    }

    const handleClick = () => {
        setMountForm(current => !current)
    }

    if (mountForm) {
        return(
            <div className={styles["new-review"]}>
                <ReviewForm handleClick={handleClick} onSaveReview={handleSaveReview} />
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