import { useState } from "react"

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
        <Card>
            <form onSubmit={handleLoginSubmit}>
                {/* label and input for username */}
                <label htmlFor="username">Username</label>
                <input id='username' value={username} onChange={handleUsernameChange} />
                {/* label and input for password */}
                <label htmlFor="password">Password</label>
                <input id='password' value={password} type='password' onChange={handlePasswordChange} />
                {/* button for submit */}
                <button type="submit">Login</button>
            </form>
        </Card>
    )
}

export default Login