// libraries
import { createPortal } from 'react-dom'
import PropTypes from "prop-types";
// UI components
import Card from './Card'
import Button from './Button'
// styling
import styles from './Modal.module.css'

// new component for portal, overlay div here
const Backdrop = ({handleClick}) => {
    return <div className={styles.backdrop} onClick={handleClick} />
}

Backdrop.propTypes = {
    handleClick: PropTypes.func
}

// new component for portal, modal body here
const ModalOverlay = ({handleClick, handleAction, error, title, message}) => {

    let shownButtons =
    <>
        <Button type='button' handleClick={handleClick}>No</Button>
        <Button type='button' handleClick={handleAction}>Yes</Button>
    </>

    if (error) {
        shownButtons =
            <Button type='button' handleClick={handleAction}>Okay</Button>
    }

    return (
        <Card className={styles.modal} >
            {/* header to contain title of error */}
            <header className={styles.header}>
                <h2>{title}</h2>
            </header>
            {/* paragraph for message */}
            <div className={styles.content}>
                <p>{message}</p>
            </div>
            {/* footer with button */}
            <footer className={styles.actions}>
                {shownButtons}
            </footer>
        </Card>
    )
}

ModalOverlay.propTypes = {
    handleClick: PropTypes.func,
    handleAction: PropTypes.func,
    error: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string
}

const Modal = ({handleError, handleClick, title, message, handleAction, error}) => {

    return (
        <>
            {/* createPortal takes in two functions above as JSX elements */}
            {/* Backdrop needs props.handleError passed in, second arg document.getElementById for backdrop in html file */}
            {/* same process with Modal, needs all props passed in tho */}
            {createPortal(
                <Backdrop handleError={handleError} handleClick={handleClick} />,
                document.getElementById('backdrop-root')
            )}
            {createPortal(
                <ModalOverlay title={title} message={message} handleAction={handleAction} handleClick={handleClick} error={error} />,
                document.getElementById('overlay-root')
            )}
        </>
    )
}

Modal.propTypes = {
    handleError: PropTypes.func,
    handleClick: PropTypes.func,
    title: PropTypes.string,
    message: PropTypes.string,
    handleAction: PropTypes.func,
    error: PropTypes.bool
}

export default Modal