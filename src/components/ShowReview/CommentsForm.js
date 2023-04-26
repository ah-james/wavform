import { useState } from 'react'
// styling
import styles from './CommentsForm.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { addComment } from '../../store/actions/comments-actions'
import CommentItem from './CommentItem'

const CommentsForm = ({ id }) => {
    const dispatch = useDispatch()
    const [text, setText] = useState('')

    const comments = useSelector((state) => {
        return state.comments.comments
    })

    const userName = localStorage.getItem('email')

    const reviewComments = comments.filter(comment => comment.reviewId === id)

    const handleClick = async () => {

        // dispatch to firebase, set new branch of comments
        // send comment text, username, and review ID
        dispatch(addComment(text, userName, id))
        setText('')
    }

    const handleTextChange = (event) => {
        setText(event.target.value)
    }


    let buttonForm = 
    <div className={styles['comment-form']}>
        <textarea id='text' name='text' rows='4' cols='40' value={text} onChange={handleTextChange} />
        <button onClick={handleClick}>Post</button>
    </div>

    if (!userName) {
        buttonForm = <p>Please sign in to reply.</p>
    }

    return (
        <>
            <p className={styles['comment-number']}>{reviewComments.length === 1 ? `${reviewComments.length} Comment` : `${reviewComments.length} Comments`}</p>
            <hr />
            <ul className={styles['comment-field']}>
                {reviewComments.length > 0 ? reviewComments.map((comment) =>
                    <CommentItem comment={comment} />
                ) : 'No Comments Yet'}
            </ul>
            {buttonForm}
        </>
    )
}

export default CommentsForm