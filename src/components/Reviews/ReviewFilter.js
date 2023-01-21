// UI components
import Input from '../UI/Input'
// styling
import styles from './ReviewFilter.module.css'

const ReviewFilter = props => {

    return (
        <>
            <Input className={styles['review-filter']} type='text' placeholder='Search for an album' onChange={props.handleFilterChange}></Input>
        </>
    )
}

export default ReviewFilter