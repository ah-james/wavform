import { useEffect, useState } from 'react'
// styling
import styles from './CommentsForm.module.css'
import { useDispatch } from 'react-redux'
import { fetchComments } from '../../store/actions/comments-actions'

const CommentsForm = ({ userName, id }) => {
    const dispatch = useDispatch()

    const [text, setText] = useState('')
    const [comments, setComments] = useState([])

    useEffect(() => {
        dispatch(fetchComments())

    }, [dispatch])

    const handleClick = async () => {
        setComments([...comments, text])
        setText('')
        // dispatch to firebase, set new branch of comments
        // send comment text, username, and review ID
        await fetch('https://react-bouncr-default-rtdb.firebaseio.com/comments.json', {
            method: 'POST',
            body: JSON.stringify({
                reviewId: id,
                text: text,
                userName: userName,
            }),
            headers: { 'Content-Type': 'application/json' }
        })
    }

    const handleTextChange = (event) => {
        setText(event.target.value)
    }

    return (
        <>
            <p className={styles['user-info']}>{comments.length === 1 ? `${comments.length} Comment` : `${comments.length} Comments`}</p>
            <hr />
            <ul className={styles.commentField}>
                {comments.length > 0 ? comments.map((comment, i) => {
                    return (
                        <div>
                            <li className={styles.comment} key={i}>{comment.text}</li>
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