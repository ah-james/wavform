import styles from './CommentItem.module.css'

const CommentItem = ({ comment }) => {

    return (
        <div key={comment.id}>
            <li className={styles.comment} >
                <p className={styles.bold}>{comment.userName}</p>
                <p className={styles.text}>{comment.text}</p>
            </li>
            <hr className={styles.commentLine} />
        </div>
    )
}

export default CommentItem