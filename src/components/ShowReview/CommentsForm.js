import { useState } from 'react'
// styling
import styles from './CommentsForm.module.css'

const CommentsForm = props => {
    const [text, setText] = useState('')
    const [comments, setComments] = useState([])

    const handleClick = () => {
        setComments([...comments, text])
    }

    const handleTextChange = (event) => {
        setText(event.target.value)
    }

    return (
        <>
            <div className={styles.comment_form}>
                <p className={styles['user-info']}>Comments</p>
                <hr className={styles.rounded} />
                <textarea id='text' name='text' rows='4' cols='40' value={text} onChange={handleTextChange} />
                <button onClick={handleClick}>Post</button>
            </div>
            <ul className={styles.commentField}>
                {comments.map((comment, i) => {
                    return <li key={i}>{comment}</li>
                })}
            </ul>
        </>
    )
}

export default CommentsForm