import { useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import ShowReview from '../components/ShowReview/ShowReview'
import Button from '../components/UI/Button'
import { deleteReview } from '../store/actions/reviews-actions'
import ErrorModal from '../components/UI/Modal'

import styles from '../components/Users/Settings.module.css'
import EditReview from '../components/ShowReview/EditReview'

// to do:
// allow user who created to edit review
// add an alert before deleting review
const ShowReviewContainer = () => {
    const [deleting, setDeleting] = useState(false)
    const [editing, setEditing] = useState(false)
    // params gives key-value pairs where keys are segments leading to page
    // ex. here, path is reviews/:id so params.id which would take value from url
    // /reviews/helloworld --> params.id = helloworld
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const creator = location.state.creator

    const reviews = useSelector((state) => {
        return state.reviews.albums
    })

    const selectedReview = reviews.find(
        review => review.id === params.id
    )

    const user = localStorage.getItem('email') === creator

    const beginDeleteReview = () => {
        setDeleting(true)
    }

    const stopDelete = () => {
        setDeleting(false)
    }

    const handleDeleteReview = async () => {
        dispatch(deleteReview(selectedReview.id))
        navigate('/')
    }

    const mountReviewForm = () => {
        setEditing(current => !current)
    }

    const editReview = async (data) => {
        console.log(data)
    }

    return(
        <div>
            {deleting && <ErrorModal title={'Warning!'} message={'Do you want to delete this review?'} handleClick={stopDelete} handleAction={handleDeleteReview} />}
            {!editing ? <ShowReview selectedReview={selectedReview} /> : <EditReview editReview={editReview} selectedReview={selectedReview} />}
            <div className={styles.button}>
                {user && !editing && <Button handleClick={beginDeleteReview}>Delete Review</Button>}
                {user && <Button handleClick={mountReviewForm}>{editing ? 'Cancel' : 'Edit Review'}</Button>}
                {user && editing && <Button form='editForm' type='submit'>Submit</Button>}
            </div>
        </div>
    )
}

export default ShowReviewContainer