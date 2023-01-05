import styles from './Button.module.css'

const Button = props => {
    let buttonColor = styles.button
    let disabledButton

    if (props.destroy) {
        buttonColor = styles.destroy
    }

    if (props.disabled) {
        disabledButton = styles.disabled
    }

    return(
        <button
        id={props.id} 
        form={props.form}
        className={`${buttonColor} ${disabledButton}`}
        type={props.type} 
        onClick={props.handleClick} 
        disabled={props.disabled}>
            {props.children}
        </button>
    )
}

export default Button