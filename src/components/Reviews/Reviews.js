import React, {useState} from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

import styles from './Reviews.module.css'

import ReviewFilter from '../Reviews/ReviewFilter';
import Card from '../UI/Card';
import ReviewsList from './ReviewsList';
import ReviewsChart from './ReviewsChart';

const Reviews = props => {
    const [filteredYear, setFilteredYear] = useState('')

    const history = useHistory()
    const location = useLocation()
    const match = useRouteMatch()

    const queryParams = new URLSearchParams(location.search)

    const isAscending = queryParams.get('sort') === 'asc'

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

    const sortReviews = filteredReviews.sort((a,b) => {
        if (isAscending) {
            return new Date(a.date) - new Date(b.date)
        } else {
            return new Date(b.date) - new Date(a.date)
        }
    })

    const changeSort = () => {
        history.push(`${match.path}?sort=${isAscending ? 'desc' : 'asc'}`)
    }

    let chart = 
        <div>
            <ReviewsChart reviews={filteredReviews} />
        </div>
        
    return(
        <Card className={styles.reviews}>
            <ReviewFilter ascending={isAscending} showFilter={props.showChart} selectedYear={filteredYear} handleFilterChange={handleFilterChange} reviews={props.reviews} changeSort={changeSort} />
            {props.showChart && chart}
            <ReviewsList reviews={sortReviews} />
        </Card>
    )
}

export default Reviews