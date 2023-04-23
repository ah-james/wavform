import { useState } from 'react'
// styling
import styles from './CommentsForm.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { addComment } from '../../store/actions/comments-actions'

const CommentsForm = ({ userName, id }) => {
    const dispatch = useDispatch()
    const [text, setText] = useState('')

    const comments = useSelector((state) => {
        return state.comments.comments
    })

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

    return (
        <>
            <p className={styles['user-info']}>{reviewComments.length === 1 ? `${reviewComments.length} Comment` : `${reviewComments.length} Comments`}</p>
            <hr />
            <ul className={styles.commentField}>
                {reviewComments.length > 0 ? reviewComments.map((comment) => {
                    return (
                        <div key={comment.id}>
                            <li className={styles.comment} >
                                <p className={styles.bold}>{comment.userName}</p>
                                <p>{comment.text}</p>
                            </li>
                            <hr className={styles.commentLine} />
                        </div>
                    )
                }) : 'No Comments Yet'}
            </ul>
            <div className={styles.comment_form}>
                <textarea id='text' name='text' rows='4' cols='40' value={text} onChange={handleTextChange} />
                <button onClick={handleClick}>Post</button>
            </div>
        </>
    )
}

export default CommentsForm