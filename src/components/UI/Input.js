// styling
import styles from './Input.module.css'

const Input = ({isValid, id, label, readonly, placeholder,size, type, min, max, value, onChange, onBlur, length, list}) => {
    return (
        <div className={`${styles.control} ${isValid === false ? styles.invalid : ''}`}>
            {/* label and input for username */}
            <label htmlFor={id}>{label}</label>
            <input 
                readOnly={readonly} 
                placeholder={placeholder} 
                size={size} 
                type={type} 
                id={id} 
                min={min} 
                max={max} 
                value={value} 
                onChange={onChange} 
                onBlur={onBlur} 
                minLength={length}
                list={list}
            />
        </div>
    )
}

export default Input