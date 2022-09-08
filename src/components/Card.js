import './Card.css'

const Card = props => {
    // create variable to allow unique classnames to be set in each instance of Card custom component
    const classes = 'card ' + props.className

    return(
        // all components receive children prop in React
        // will always be content between opening and closing tabs in component
        <div className={classes}>{props.children}</div>
    )
}

export default Card