import styles from './Button.module.css'

const Button = props => {
    return(
        <button 
        className={`${styles.button} ${props.disabled === true ? styles.disabled : ''}`} 
        type={props.type} 
        onClick={props.handleClick} 
        disabled={props.disabled}>
            {props.children}
        </button>
    )
}

export default Button