import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserShowReviewButtons from './UserShowReviewButtons'

import ShowReview from '../ShowReview/ShowReview'
import { deleteReview, editReview } from '../../store/actions/reviews-actions'
import Modal from '../UI/Modal'

import EditReview from '../ShowReview/EditReview'


const UserShowReview = props => {
    const [deleting, setDeleting] = useState(false)
    const [editing, setEditing] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const beginDeleteReview = () => {
        setDeleting(true)
    }

    const stopDelete = () => {
        setDeleting(false)
    }

    const handleDeleteReview = async () => {
        dispatch(deleteReview(props.selectedReview.id))
        navigate('/')
    }

    const mountReviewForm = () => {
        setEditing(current => !current)
    }

    const handleEditReview = async (data) => {
        dispatch(editReview(data))
        navigate(`/`)
    }

    return (
        <>
            {deleting && <Modal title={'Warning!'} message={'Do you want to delete this review?'} handleClick={stopDelete} handleAction={handleDeleteReview} />}
            {!editing ? <ShowReview selectedReview={props.selectedReview} /> : <EditReview handleEditReview={handleEditReview} selectedReview={props.selectedReview} />}
            <UserShowReviewButtons user={props.user} editing={editing} beginDeleteReview={beginDeleteReview} mountReviewForm={mountReviewForm} />
        </>
    )
}

export default UserShowReview