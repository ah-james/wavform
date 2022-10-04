import { useState } from 'react'

import './AlbumItem.css'
import Card from './Card'

const AlbumItem = props => {
    // create state to manipulate in component
    const [album, setAlbum] = useState(props.album)

    const month = props.date.toLocaleString('en-US', { month: 'long' })
    const day = props.date.toLocaleString('en-US', { day: '2-digit' })
    const year = props.date.getFullYear()

    // function to handle click, functions that are called by an event handler should 
    // include "handle" in the name
    const handleClick = () => {
        setAlbum('New Album Title')
    }

    return(
        <Card className="album-item">
            <div className="album-description">
                <div className="album-month">{month}</div>
                <div className="album-day">{day}</div>
                <div className="album-year">{year}</div>
            </div>
            <div className="album-item-description">
                <h2>{props.artist}</h2>
                <h2>{album}</h2>
            </div>
            <div className="album-item-info">
                <p>{props.rating}</p>
            </div>
            <button onClick={handleClick}>Change Album Name</button>
        </Card>
    )
}

export default AlbumItem