import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

import styles from './Reviews.module.css'

import ReviewFilter from '../Reviews/ReviewFilter';
import Card from '../UI/Card';
import ReviewsList from './ReviewsList';
import ReviewsChart from './ReviewsChart';

const Reviews = props => {
    const [filteredYear, setFilteredYear] = useState('')

    const history = useHistory()

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

    const changeSort = () => {
        let path = 'reviews'
        if (props.showFilter) {
            path = 'home'
        }

        console.log('sorting')
        history.push(`/${path}?sort=asc`)
    }

    let chart = 
        <div>
            <ReviewsChart reviews={filteredReviews} />
        </div>
        
    return(
        <Card className={styles.reviews}>
            <ReviewFilter showFilter={props.showChart} selectedYear={filteredYear} handleFilterChange={handleFilterChange} changeSort={changeSort} />
            {props.showChart && chart}
            <ReviewsList reviews={filteredReviews} />
        </Card>
    )
}

export default Reviews