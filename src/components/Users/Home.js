import Card from "../UI/Card";
import styles from './Home.module.css'


const Home = props => {

    return(
        <Card className={styles.home}>
            <h1>Welcome back!</h1>
        </Card>
    )
}

export default Home