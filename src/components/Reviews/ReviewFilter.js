import React from 'react'
import Input from '../UI/Input'

import styles from './ReviewFilter.module.css'

const ReviewFilter = props => {

    return (
        <>
            <Input className={styles['review-filter-control']} type='text' placeholder='Search for an album' onChange={props.handleFilterChange}></Input>
        </>
    )
}

export default ReviewFilter