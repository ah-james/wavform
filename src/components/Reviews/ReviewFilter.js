import React from 'react'

import styles from './ReviewFilter.module.css'
// import Button from '../UI/Button'

const ReviewFilter = props => {
    // const yearsArray = []

    // const handleChange = (event) => {
    //     props.handleFilterChange(event.target.value)
    // }

    // props.reviews.forEach(review => {
    //     const date = new Date(review.date)
    //     const year = date.getFullYear()
    //     yearsArray.push(year)
    // })

    // const yearsSet = [...new Set(yearsArray)]

    // let dynamicOptions = yearsSet.map(year => {
    //     return <option key={year} value={`${year}`}>{year}</option>
    // })

    // let filter =
    // <select value={props.selectedYear} onChange={handleChange}>
    //     <option value=''>Select a Year</option>
    //     {dynamicOptions}
    // </select>

    return (
        // <div className={styles['review-filter']}>
        //     <div className={styles['review-filter-control']}>
        //         <label>{props.showFilter ? 'Filter or Sort by Year' : 'Sort by Year'}</label>
        //         <Button handleClick={props.changeSort}>Sort {props.ascending ? 'Descending' : 'Ascending'}</Button>
        //         {/* <Button handleClick={years} /> */}
        //         {props.showFilter && filter}
        //     </div>
        // </div>

        <div>
            <input className={styles['review-filter-control']} type='text' placeholder='search for an album' onChange={props.handleFilterChange}></input>
        </div>
    )
}

export default ReviewFilter