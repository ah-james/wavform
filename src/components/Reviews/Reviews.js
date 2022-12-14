import React, {useState} from 'react';

import styles from './Reviews.module.css'

import ReviewFilter from '../Reviews/ReviewFilter';
import Card from '../UI/Card';
import ReviewsList from './ReviewsList';
import ReviewsChart from './ReviewsChart';

const Reviews = props => {
    const [filteredYear, setFilteredYear] = useState('')

    const handleFilterChange = selectedYear => {
        setFilteredYear(selectedYear)
    }

    const filteredReviews = props.reviews.filter(review => {
        const date = new Date(review.date)
        if (filteredYear === '') {
            return props.reviews
        }
        return date.getFullYear().toString() === filteredYear
    })

    let filter = 
        <div>
            <ReviewFilter selectedYear={filteredYear} handleFilterChange={handleFilterChange}/>
            <ReviewsChart reviews={filteredReviews} />
        </div>
        
    return(
        <Card className={styles.reviews}>
            {props.showFilter && filter}
            <ReviewsList reviews={filteredReviews} />
        </Card>
    )
}

export default Reviews