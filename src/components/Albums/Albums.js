import React, {useState} from 'react';

import styles from './Albums.module.css'

import AlbumFilter from '../Albums/AlbumFilter';
import Card from '../UI/Card';
import AlbumsList from './AlbumsList';
import AlbumsChart from './AlbumsChart';

const Albums = props => {
    const [filteredYear, setFilteredYear] = useState('')

    const handleFilterChange = selectedYear => {
        setFilteredYear(selectedYear)
    }

    const filteredReviews = props.reviews.filter(review => {
        if (filteredYear === '') {
            return props.reviews
        }
        return review.date.getFullYear().toString() === filteredYear
    })

    return(
        <Card className={styles.albums}>
            <AlbumFilter selectedYear={filteredYear} handleFilterChange={handleFilterChange}/>
            {/* Add chart to page, pass in filteredExpenses as a prop */}
            <AlbumsChart reviews={filteredReviews} />
            <AlbumsList reviews={filteredReviews} />
        </Card>
    )
}

export default Albums