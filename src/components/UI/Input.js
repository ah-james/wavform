// styling
import styles from './Input.module.css'

const Input = props => {
    return (
        <div className={`${styles.control} ${props.isValid === false ? styles.invalid : ''}`}>
            {/* label and input for username */}
            <label htmlFor={props.id}>{props.label}</label>
            <input readOnly={props.readonly} placeholder={props.placeholder} size={props.size} type={props.type} id={props.id} min={props.min} max={props.max} value={props.value} onChange={props.onChange} onBlur={props.onBlur} minLength={props.length} />
        </div>
    )
}

export default Input