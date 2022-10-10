import React, { useState } from "react";

import './AlbumForm.css'

const AlbumForm = props => {
    // manage state
    const [artist, setArtist] = useState('')
    const [album, setAlbum] = useState('')
    const [rating, setRating] = useState('')
    const [date, setDate] = useState('')

    const handleArtistChange = (event) => {
        setArtist(event.target.value)
    }

    const handleAlbumChange = event => {
        setAlbum(event.target.value)
    }

    const handleRatingChange = (event) => {
        setRating(event.target.value)
    }

    const handleDateChange = (event) => {
        setDate(event.target.value)
    }

    // create function to handle form submission
    const handleSubmit = event => {
        event.preventDefault()

        const albumData = {
            artist: artist,
            album: album,
            rating: rating,
            date: new Date(date)
        }

        console.log(albumData)
        // reset form input fields on submission
        setArtist('')
        setAlbum('')
        setRating('')
        setDate('')
    }

    return(
        <form onSubmit={handleSubmit} >
            <div className="new-album-controls">
                <div className="new-album-control">
                    <label>Artist</label>
                    <input type='text' value={artist} onChange={handleArtistChange} />
                </div>
                <div className="new-album-control">
                    <label>Album</label>
                    <input type='text' value={album} onChange={handleAlbumChange} />
                </div>
                <div className="new-album-control">
                    <label>Rating</label>
                    <input type='number' min='0' max='10' value={rating} onChange={handleRatingChange} />
                </div>
                <div className="new-album-control">
                    <label>Date</label>
                    <input type='date' value={date} onChange={handleDateChange} />
                </div>
            </div>
            <div className="new-album-actions">
                <button type="submit">Add Album</button>
            </div>
        </form>
    )
}

export default AlbumForm