import React from 'react'

import styles from './ReviewFilter.module.css'

const ReviewFilter = props => {
    const handleChange = (event) => {
        props.handleFilterChange(event.target.value)
    }

    return (
        <div className={styles['review-filter']}>
            <div className={styles['review-filter-control']}>
                <label>Filter by Year</label>
                <select value={props.selectedYear} onChange={handleChange}>
                    {/* change this eventually so it isn't hardcoded but adds new year if new album from that year added */}
                    <option value=''>Select a Year</option>
                    <option value='2022'>2022</option>
                    <option value='2021'>2021</option>
                    <option value='2020'>2020</option>
                    <option value='2019'>2019</option>
                </select>
            </div>
        </div>
    )
}

export default ReviewFilter