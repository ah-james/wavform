// import react dom for createPortal
import { createPortal } from 'react-dom'

import styles from './Modal.module.css'
import Card from './Card'
import Button from './Button'

// new component for portal, overlay div here
const Backdrop = props => {
    return <div className={styles.backdrop} onClick={props.handleClick} />
}

// new component for portal, modal body here
const ModalOverlay = props => {

    let shownButtons =
    <>
        <Button type='button' handleClick={props.handleClick}>No</Button>
        <Button type='button' handleClick={props.handleAction}>Yes</Button>
    </>

    if (props.error) {
        shownButtons =
            <Button type='button' handleClick={props.handleAction}>Okay</Button>
    }

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
            {/* footer with button */}
            <footer className={styles.actions}>
                {shownButtons}
            </footer>
        </Card>
    )
}


const Modal = props => {

    return (
        <>
            {/* createPortal takes in two functions above as JSX elements */}
            {/* Backdrop needs props.handleError passed in, second arg document.getElementById for backdrop in html file */}
            {/* same process with Modal, needs all props passed in tho */}
            {createPortal(
                <Backdrop handleError={props.handleError} handleClick={props.handleClick} />,
                document.getElementById('backdrop-root')
            )}
            {createPortal(
                <ModalOverlay title={props.title} message={props.message} handleAction={props.handleAction} handleClick={props.handleClick} error={props.error} />,
                document.getElementById('overlay-root')
            )}
        </>
    )
}

export default Modal