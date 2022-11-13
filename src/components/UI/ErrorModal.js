import styles from './ErrorModal.module.css'
import Card from './Card'

const ErrorModal = props => {

    return(
        <div>
            <div className={styles.backdrop} />
            <Card className={styles.modal} >
                {/* header to contain title of error */}
                <header className={styles.header}>
                    <h2>{props.title}</h2>
                </header>
                {/* paragraph for message */}
                <div className={styles.content}>
                    <p>{props.message}</p>
                </div>
                {/* footer with confirm button */}
                <footer className={styles.actions}>
                    <button type='button'>Okay</button>
                </footer>
            </Card>
        </div>
    )
}

export default ErrorModal