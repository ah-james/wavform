// UI components
import Input from '../UI/Input'
// styling
import styles from './ReviewFilter.module.css'

const ReviewFilter = ({handleFilterChange}) => {

    return (
        <>
            <Input className={styles['review-filter']} type='text' placeholder='Search for an album' onChange={handleFilterChange}></Input>
        </>
    )
}

export default ReviewFilter