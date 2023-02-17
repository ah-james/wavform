// libraries
import React, { useState } from 'react';
import PropTypes from "prop-types";
// components
import ReviewsList from './ReviewsList';
import ReviewsChart from './ReviewsChart';
import ReviewFilter from '../Reviews/ReviewFilter';
// UI components
import Card from '../UI/Card';
// styling
import styles from './Reviews.module.css'

const Reviews = ({reviews, showChart}) => {
    const [search, setSearch] = useState('')

    const handleFilterChange = event => {
        setSearch(event.target.value)
    }

    const filteredReviews = search.length === 0 ? reviews :
        reviews.filter(review => 
            review.album.toLowerCase().includes(search.toLowerCase())
    )

    let chart =
    <div>
        <ReviewsChart reviews={reviews} />
    </div>

    return (
        <Card className={styles.reviews}>
            <ReviewFilter handleFilterChange={handleFilterChange} />
            {showChart && chart}
            <ReviewsList reviews={filteredReviews} />
        </Card>
    )
}

Reviews.propTypes = {
    reviews: PropTypes.object, 
    showChart: PropTypes.bool
}

export default Reviews