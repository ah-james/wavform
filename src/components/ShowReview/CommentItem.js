
const CommentItem = ({ comment }) => {

    return (
        <div key={comment.id}>
            <li className={styles.comment} >
                <p className={styles.bold}>{comment.userName}</p>
                <p>{comment.text}</p>
            </li>
            <hr className={styles.commentLine} />
        </div>
    )
}

export default CommentItem