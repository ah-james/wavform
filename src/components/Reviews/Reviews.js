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

    return(
        <Card className={styles.reviews}>
            <ReviewFilter selectedYear={filteredYear} handleFilterChange={handleFilterChange}/>
            {/* Add chart to page, pass in filteredExpenses as a prop */}
            <ReviewsChart reviews={filteredReviews} />
            <ReviewsList reviews={filteredReviews} />
        </Card>
    )
}

export default Reviews