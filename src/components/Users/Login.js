import { useEffect, useState } from "react"
import Card from "../UI/Card"
import styles from './Login.module.css'

// finish this when I have the router up and running
// 
const Login = props => {
    // username and password state
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [validUsername, setValidUsername] = useState()
    const [validPassword, setValidPassword] = useState()
    const [validForm, setValidForm] = useState(false)

    // add useEffect to handle form validations
    useEffect(() => {
        setValidForm(
            username.length > 6 && password.length > 6
        )
    }, [username, password])

    const handleUsernameChange = event => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value)
    }

    const handleValidateUsername = () => {
        setValidUsername(username.length > 6);
      };
    
      const handleValidatePassword = () => {
        setValidPassword(password.length > 6);
      };

    const handleLoginSubmit = (event) => {
        event.preventDefault()
        // prop to handle user login
        props.handleLogin(username, password)
    }

    return(
        <Card className={styles.login}>
            <form onSubmit={handleLoginSubmit}>
                <div className={`${styles.control} ${validUsername === false ? styles.invalid : ''}`}>
                    {/* label and input for username */}
                    <label htmlFor="username">Username</label>
                    <input id='username' value={username} onChange={handleUsernameChange} onBlur={handleValidateUsername} />
                </div>
                <div className={`${styles.control} ${validPassword === false ? styles.invalid : ''}`}>
                    {/* label and input for password */}
                    <label htmlFor="password">Password</label>
                    <input id='password' value={password} type='password' onChange={handlePasswordChange} onBlur={handleValidatePassword} />
                </div>
                <div className={styles.actions}>
                    {/* button for submit */}
                    <button type="submit" disabled={!validForm}>Login</button>
                </div>
            </form>
        </Card>
    )
}

export default Login