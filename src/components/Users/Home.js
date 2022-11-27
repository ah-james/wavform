import { useContext } from "react";
import AuthContext from "../../store/auth-context";

import Card from "../UI/Card";
import styles from './Home.module.css'


const Home = props => {
    // useContext for state managment
    const ctx = useContext(AuthContext)

    return(
        <Card className={styles.home}>
            <h1>Welcome back!</h1>
            <button onClick={ctx.handleLogout}>Logout</button>
        </Card>
    )
}

export default Home