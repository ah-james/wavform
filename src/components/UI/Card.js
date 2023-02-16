// libraries
import PropTypes from "prop-types";
// styling
import styles from './Card.module.css'

const Card = ({className, children}) => {
    // create variable to allow unique classnames to be set in each instance of Card custom component
    // const classes = 'card ' + props.className

    return (
        // all components receive children prop in React
        // will always be content between opening and closing tabs in component
        <div className={`${styles.card} ${className}`}>{children}</div>
    )
}

Card.propTypes = {
    className: PropTypes.string
}

export default Card