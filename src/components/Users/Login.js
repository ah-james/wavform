import { useState } from "react"


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

    return(
        <Card className={styles.input}>
            <form onSubmit={handleAddUser}>
                {/* label and input for username */}
                <label htmlFor="username">Username</label>
                <input id='username' value={username} type='email' onChange={handleUsernameChange} />
                {/* label and input for password */}
                <label>Password</label>
                <input id='password' value={password} type='password' onChange={handlePasswordChange} />
                {/* button for submit */}
                <button type="submit">Login</button>
            </form>
        </Card>
    )
}

export default Login