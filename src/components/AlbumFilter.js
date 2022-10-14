import React from 'react'

import './AlbumFilter.css'

const AlbumFilter = () => {
    return (
        <div className='album-filter'>
            <div className='album-filter-control'>
                <label>Filter by Year</label>
                <select>
                    <option value='2022'>2022</option>
                    <option value='2021'>2021</option>
                    <option value='2020'>2020</option>
                    <option value='2019'>2019</option>
                </select>
            </div>
        </div>
    )
}

export default AlbumFilter