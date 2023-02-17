// libraries
import PropTypes from "prop-types";
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

Input.propTypes = {
    isValid: PropTypes.bool,
    id: PropTypes.string,
    label: PropTypes.string,
    readonly: PropTypes.bool,
    placeholder: PropTypes.string,
    size: PropTypes.number,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    length: PropTypes.string,
    list: PropTypes.string
}

// value, onChange, onBlur, length, list

export default Input