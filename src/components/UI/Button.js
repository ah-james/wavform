// libraries
import PropTypes from "prop-types";
// styling
import styles from './Button.module.css'

const Button = ({destroy, disabled, id, form, type, handleClick, children}) => {
    let buttonColor = styles.button
    let disabledButton

    if (destroy) {
        buttonColor = styles.destroy
    }

    if (disabled) {
        disabledButton = styles.disabled
    }

    return (
        <button
            id={id}
            form={form}
            className={`${buttonColor} ${disabledButton}`}
            type={type}
            onClick={handleClick}
            disabled={disabled}>
            {children}
        </button>
    )
}

Button.propTypes = {
    destroy: PropTypes.bool,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    form: PropTypes.string,
    type: PropTypes.string,
    handleClick: PropTypes.func
}
// destroy, disabled, id, form, type, handleClick, children

export default Button