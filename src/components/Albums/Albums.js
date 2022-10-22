import React, {useState} from 'react';

import './Albums.css'

import AlbumFilter from '../Albums/AlbumFilter';
import AlbumItem from '../Albums/AlbumItem';
import Card from '../UI/Card';

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

    // set variable to text shown on page if filteredAlbums is empty
    let returnedContent = <p>No Albums Found</p>

    // if statement, if there's data in filteredAlbums, return mapped filteredAlbums array
    if (filteredAlbums.length > 0) {
        returnedContent = filteredAlbums.map((filteredReview) => 
        <AlbumItem key={filteredReview.id} artist={filteredReview.artist} album={filteredReview.album} date={filteredReview.date} rating={filteredReview.rating} />
    )
    }

    return(
        <Card className='albums'>
            <AlbumFilter selectedYear={filteredYear} handleFilterChange={handleFilterChange}/>
            {returnedContent}
        </Card>
    )
}

export default Albums