import React, {useState} from 'react';

import './Albums.css'

import AlbumFilter from '../Albums/AlbumFilter';
import Card from '../UI/Card';
import AlbumsList from './AlbumsList';

const Albums = props => {
    const [filteredYear, setFilteredYear] = useState('')

    const handleFilterChange = selectedYear => {
        setFilteredYear(selectedYear)
    }

    const filteredAlbums = props.reviews.filter(review => {
        if (filteredYear === '') {
            return props.reviews
        }
        return review.date.getFullYear().toString() === filteredYear
    })

    return(
        <Card className='albums'>
            <AlbumFilter selectedYear={filteredYear} handleFilterChange={handleFilterChange}/>
            <AlbumsList albums={filteredAlbums} />
        </Card>
    )
}

export default Albums