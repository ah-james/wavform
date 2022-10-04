import React from "react";

import './AlbumForm.css'

const AlbumForm = props => {
    return(
        <form>
            <div className="new-expense-controls">
                <div className="new-expense-control">
                    <label>Artist</label>
                    <input type='text' />
                </div>
                <div className="new-expense-control">
                    <label>Album</label>
                    <input type='text' />
                </div>
                <div className="new-expense-control">
                    <label>Rating</label>
                    <input type='text' />
                </div>
                <div className="new-expense-control">
                    <label>Date</label>
                    <input type='date' />
                </div>
            </div>
            <div className="new-expense-actions">
                <button type="submit">Add Expense</button>
            </div>
        </form>
    )
}

export default AlbumForm