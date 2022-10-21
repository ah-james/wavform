import React, {useState} from 'react';

import './Albums.css'

import AlbumFilter from '../Albums/AlbumFilter';
import AlbumItem from '../Albums/AlbumItem';
import Card from '../UI/Card';

const Albums = props => {
    const [filteredYear, setFilteredYear] = useState()

    const handleFilterChange = selectedYear => {
        setFilteredYear(selectedYear)
    }

    return(
        <Card className='albums'>
            <AlbumFilter selectedYear={filteredYear} handleFilterChange={handleFilterChange}/>
            {props.reviews.map((review) => <AlbumItem key={review.id} artist={review.artist} album={review.album} date={review.date} rating={review.rating} />)}
        </Card>
    )

}

export default Albums