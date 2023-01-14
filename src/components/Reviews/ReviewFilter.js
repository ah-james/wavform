import React from 'react'

import styles from './ReviewFilter.module.css'
// import Button from '../UI/Button'

const ReviewFilter = props => {

    return (
        <>
            <input className={styles['review-filter-control']} type='text' placeholder='search for an album' onChange={props.handleFilterChange}></input>
        </>
    )
}

export default ReviewFilter