import React from 'react'

import styles from './Input.module.css'

const Input = React.forwardRef((props, ref) => {
    return(
        <div className={`${styles.control} ${props.isValid === false ? styles.invalid : ''}`}>
            {/* label and input for username */}
            <label htmlFor={props.id}>{props.label}</label>
            <input size={props.size} type={props.type} id={props.id} min={props.min} max={props.max} value={props.value} onChange={props.onChange} onBlur={props.onBlur} minLength={props.length} />
        </div>
    )
})

export default Input