// import react dom for createPortal
import {createPortal} from 'react-dom'

import styles from './ErrorModal.module.css'
import Card from './Card'

// new component for portal, overlay div here
const Backdrop = props => {
    return <div className={styles.backdrop} onClick={props.handleError} />
}

// new component for portal, modal body here
const ModalOverlay = props => {
    return (
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
                <button type='button' onClick={props.handleError} >Try Again</button>
            </footer>
        </Card>
    )
}


const ErrorModal = props => {

    return(
        <>
            {/* createPortal takes in two functions above as JSX elements */}
            {/* Backdrop needs props.handleError passed in, second arg document.getElementById for backdrop in html file */}
            {/* same process with Modal, needs all props passed in tho */}
            {createPortal(
                <Backdrop handleError={props.handleError} />,
                document.getElementById('backdrop-root')
            )}
            {createPortal(
                <ModalOverlay title={props.title} message={props.message} handleError={props.handleError} />,
                document.getElementById('overlay-root')
            )}
        </>
    )
}

export default ErrorModal