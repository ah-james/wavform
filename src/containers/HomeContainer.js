// libraries
import { useNavigate } from 'react-router-dom'
// UI components
import Button from '../components/UI/Button'
// styling
import styles from './HomeContainer.module.css'

const HomeContainer = () => {
    const navigate = useNavigate()

    return (
        <div className={styles['home-page']}>
            <h2>Track albums you've listened to.</h2>
            <h2>Save those you haven't heard yet.</h2>
            <h2>Tell your friends what's good.</h2>
            <Button handleClick={() => navigate('/signup')}>Get Started - It's Free!</Button>
        </div>
    )
}

export default HomeContainer