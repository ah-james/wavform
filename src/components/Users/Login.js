import { useState } from "react"
import Card from "../UI/Card"
import styles from './Login.module.css'

// finish this when I have the router up and running
// 
const Login = props => {
    // username and password state
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = event => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value)
    }

    const handleLoginSubmit = (event) => {
        event.preventDefault()
        // prop to handle user login
    }

    return(
        <Card className={styles.login}>
            <form onSubmit={handleLoginSubmit}>
                {/* <div className={ `${styles.control} ${emailIsValid === false ? styles.invalid : ''}` } /> */}
                <div className={styles.control}>
                    {/* label and input for username */}
                    <label htmlFor="username">Username</label>
                    <input id='username' value={username} onChange={handleUsernameChange} />
                </div>
                <div className={styles.control}>
                    {/* label and input for password */}
                    <label htmlFor="password">Password</label>
                    <input id='password' value={password} type='password' onChange={handlePasswordChange} />
                </div>
                <div className={styles.actions}>
                    {/* button for submit */}
                    <button type="submit">Login</button>
                </div>
            </form>
        </Card>
    )
}

export default Login