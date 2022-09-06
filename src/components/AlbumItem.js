import './AlbumItem.css'

const AlbumItem = props => {
    const month = props.date.toLocaleString('en-US', { month: 'long' })
    const day = props.date.toLocaleString('en-US', { day: '2-digit' })
    const year = props.date.getFullYear()

    return(
        <div className="album-item">
            <div className="album-description">
                <div className="album-month">{month}</div>
                <div className="album-day">{day}</div>
                <div className="album-year">{year}</div>
            </div>
            <div className="album-item-description">
                <h2>{props.artist}</h2>
                <h2>{props.album}</h2>
            </div>
            <div className="album-item-info">
                <p>{props.rating}</p>
            </div>
        </div>
    )
}

export default AlbumItem