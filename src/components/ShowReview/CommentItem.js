import { Link } from "react-router-dom"

import styles from './CommentItem.module.css'

const CommentItem = ({ comment }) => {

    return (
        <div key={comment.id}>
            <li className={styles.comment} >
                <p className={styles.bold}><Link to={`/user/${comment.userName}`} >{comment.userName}</Link></p>
                <div className={styles.text}>
                    <p>{comment.text}</p>
                </div>
            </li>
            <hr className={styles['comment-line']} />
        </div>
    )
}

export default CommentItem