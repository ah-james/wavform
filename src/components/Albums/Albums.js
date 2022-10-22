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

    return(
        <Card className='albums'>
            <AlbumFilter selectedYear={filteredYear} handleFilterChange={handleFilterChange}/>
            {filteredAlbums.map((filteredReview) => 
                <AlbumItem key={filteredReview.id} artist={filteredReview.artist} album={filteredReview.album} date={filteredReview.date} rating={filteredReview.rating} />
            )}
        </Card>
    )
}

export default Albums