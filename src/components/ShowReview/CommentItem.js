import styles from './CommentItem.module.css'

const CommentItem = ({ comment }) => {

    return (
        <div key={comment.id}>
            <li className={styles.comment} >
                <p className={styles.bold}>{comment.userName}</p>
                <div className={styles.text}>
                    <p>{comment.text}</p>
                </div>
            </li>
            <hr className={styles.commentLine} />
        </div>
    )
}

export default CommentItem