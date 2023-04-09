// styling
import styles from './CommentsForm.module.css'

const CommentsForm = props => {

    return (
        <div className={styles.comments}>
            <p className={styles['user-info']}>Comments</p>
            <hr className={styles.rounded} />
            <textarea id='text' name='text' rows='4' cols='40' />
            <button>Post</button>
        </div>
    )
}

export default CommentsForm