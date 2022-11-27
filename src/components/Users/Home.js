import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import Button from "../UI/Button";

import Card from "../UI/Card";
import styles from './Home.module.css'


const Home = props => {
    // useContext for state managment
    const ctx = useContext(AuthContext)

    return(
        <Card className={styles.home}>
            <h1>Welcome back!</h1>
            <Button handleClick={ctx.handleLogout}>Logout</Button>
        </Card>
    )
}

export default Home