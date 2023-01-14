import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';

import styles from './Reviews.module.css'

import ReviewFilter from '../Reviews/ReviewFilter';
import Card from '../UI/Card';
import ReviewsList from './ReviewsList';
import ReviewsChart from './ReviewsChart';

// to do
// add search bar
const Reviews = props => {
    // const [filteredYear, setFilteredYear] = useState('')
    const [search, setSearch] = useState('')

    // const navigate = useNavigate()
    // const location = useLocation()

    // const queryParams = new URLSearchParams(location.search)

    // const isAscending = queryParams.get('sort') === 'asc'

    // const handleFilterChange = selectedYear => {
    //     setFilteredYear(selectedYear)
    // }

    const handleFilterChange = event => {
        setSearch(event.target.value)
    }

    // const reviews = props.reviews.filter(review => {
    //     const date = new Date(review.date)
    //     if (filteredYear === '') {
    //         return props.reviews
    //     }
    //     return date.getFullYear().toString() === filteredYear
    // })

    const filteredReviews = search.length === 0 ? props.reviews :
        props.reviews.filter(review => 
            review.album.toLowerCase().includes(search.toLowerCase())
    )

    // const sortReviews = reviews.sort((a, b) => {
    //     if (isAscending) {
    //         return new Date(a.date) - new Date(b.date)
    //     } else {
    //         return new Date(b.date) - new Date(a.date)
    //     }
    // })

    // const changeSort = () => {
    //     navigate(`?sort=${isAscending ? 'desc' : 'asc'}`)
    // }

    let chart =
    <div>
        <ReviewsChart reviews={props.reviews} />
    </div>

    return (
        <Card className={styles.reviews}>
            <ReviewFilter handleFilterChange={handleFilterChange} />
            {props.showChart && chart}
            <ReviewsList reviews={filteredReviews} />
        </Card>
    )
}

export default Reviews