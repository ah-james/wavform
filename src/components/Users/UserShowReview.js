// libraries
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PropTypes from "prop-types";
// components
import UserShowReviewButtons from './UserShowReviewButtons'
import ShowReview from '../ShowReview/ShowReview'
import EditReview from '../ShowReview/EditReview'
// UI components
import Modal from '../UI/Modal'
// redux store
import { deleteReview, editReview } from '../../store/actions/reviews-actions'

const UserShowReview = ({user, selectedReview}) => {
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
        dispatch(deleteReview(selectedReview.id))
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
            {!editing ? <ShowReview selectedReview={selectedReview} /> : <EditReview handleEditReview={handleEditReview} selectedReview={selectedReview} />}
            <UserShowReviewButtons user={user} editing={editing} beginDeleteReview={beginDeleteReview} mountReviewForm={mountReviewForm} />
        </>
    )
}

UserShowReview.propTypes = {
    user: PropTypes.bool,
    selectedReview: PropTypes.object
}

export default UserShowReview