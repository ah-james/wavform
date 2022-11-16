import { useState } from "react"
import Card from "../UI/Card"
import ErrorModal from "../UI/ErrorModal"
import styles from './AddUser.module.css'

const AddUser = props => {
    // usestate for username, email, password
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // usestate to set errors, empty state
    const [error, setError] = useState()

    // function to handle add user
    const handleAddUser = event => {
        event.preventDefault()
        if (username.length === 0 || email.length === 0 || password.length === 0) {
            // setError, object with title and message
            setError({
                title: 'You missed a spot!',
                message: 'Please fill out each form field'
            })
            return
        }
        console.log(username, email, password)
        setUsername('')
        setEmail('')
        setPassword('')
    }

    // handle changes for username, email, password
    const handleUsernameChange = event => {
        setUsername(event.target.value)
    }

    const handleEmailChange = event => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value)
    }

    // handle error, setError to null
    const handleError = () => {
        setError(null)
    }

    // return form for username and password
    return(
        <>
            {/* if an error exists conditionally render ErrorModal using && operator */}
            {error && <ErrorModal title={error.title} message={error.message} handleError={handleError} />}
            {/* add input class to card for styling */}
            <Card className={styles.input}>
                <form onSubmit={handleAddUser}>
                    {/* label and input for email */}
                    <label htmlFor="email">Email</label>
                    <input id='email' type='email' value={email} onChange={handleEmailChange} />
                    {/* label and input for username */}
                    <label htmlFor="username">Username</label>
                    <input id='username' value={username} onChange={handleUsernameChange} />
                    {/* label and input for password */}
                    <label>Password</label>
                    <input id='password' value={password} type='password' onChange={handlePasswordChange} />
                    {/* button for submit */}
                    <button type="submit">Create</button>
                </form>
            </Card>
        </>
    )
}

export default AddUser