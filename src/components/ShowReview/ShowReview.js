

const ShowReview = props => {
    
    if (!props.selectedReview) {
        return <h1>No Review Found</h1>
    }

    return(
        <div>
            <h1>{props.selectedReview.artist}</h1>
            <h3>{props.selectedReview.album}</h3>
            <p>{props.selectedReview.rating}</p>
        </div>
    )
}

export default ShowReview