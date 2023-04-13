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
            <p className={styles['user-info']}>{comments.length === 1 ? `${comments.length} Comment` : `${comments.length} Comments`}</p>
            <hr />
            <ul className={styles.commentField}>
                {comments.map((comment, i) => {
                    return (
                        <div>
                            <li className={styles.comment} key={i}>{comment}</li>
                            <hr className={styles.commentLine} />
                        </div>
                    )
                })}
            </ul>
            <div className={styles.comment_form}>
                <textarea id='text' name='text' rows='4' cols='40' value={text} onChange={handleTextChange} />
                <button onClick={handleClick}>Post</button>
            </div>
        </>
    )
}

export default CommentsForm