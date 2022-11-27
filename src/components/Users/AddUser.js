import { useState, useReducer, useEffect } from "react"
import Button from "../UI/Button"
import Card from "../UI/Card"
import ErrorModal from "../UI/ErrorModal"
import styles from './AddUser.module.css'

const reducer = (state, action) => {
    if (action.type === 'USER_CHANGE') {
        return {
            value: action.value,
            isValid: action.value.length > 6
        }
    }

    if (action.type === 'EMAIL_CHANGE') {
        return {
            value: action.value,
            isValid: action.value.includes('@')
        }
    }

    if (action.type === 'PASS_CHANGE') {
        return {
            value: action.value,
            isValid: action.value.length > 6
        }
    }

    if (action.type === 'INPUT_BLUR') {
        return {
            value: state.value,
            isValid: state.value.length > 6
        }
    }

    return {value: '', isValid: false}
}

const AddUser = props => {
    // usestate for username, email, password
    // const [username, setUsername] = useState('')
    // const [validUsername, setValidUsername] = useState()
    // const [email, setEmail] = useState('')
    // const [validEmail, setValidEmail] = useState()
    // const [password, setPassword] = useState('')
    // const [validPassword, setValidPassword] = useState()
    // usestate to set errors, empty state
    const [error, setError] = useState()

    // useReducers for username, email, password
    const [userState, dispatchUser] = useReducer(reducer, {
        value: '', 
        isValid: undefined
    })

    const [passwordState, dispatchPassword] = useReducer(reducer, {
        value: '',
        isValid: undefined
    })

    const [emailState, dispatchEmail] = useReducer(reducer, {
        value: '',
        isValid: undefined
    })

    // function to handle add user
    const handleAddUser = event => {
        event.preventDefault()
        if (userState.value.length === 0 || emailState.value.length === 0 || passwordState.value.length === 0) {
            // setError, object with title and message
            setError({
                title: 'You missed a spot!',
                message: 'Please fill out each form field'
            })
            return
        }
        console.log(userState.value, emailState.value, passwordState.value)
        // setUsername('')
        // setEmail('')
        // setPassword('')
    }

    // handle changes for username, email, password
    const handleUsernameChange = event => {
        dispatchUser({type: 'USER_CHANGE', value: event.target.value})
    }

    const handleEmailChange = event => {
        dispatchEmail({type: 'EMAIL_CHANGE', value: event.target.value})
    }

    const handlePasswordChange = event => {
        dispatchPassword({type: 'PASS_CHANGE', value: event.target.value})
    }

    const handleValidateUsername = () => {
        dispatchUser({type: 'INPUT_BLUR'});
    }

    const handleValidateEmail = () => {
        dispatchEmail({type: 'INPUT_BLUR'});
    }

    const handleValidatePassword = () => {
        dispatchEmail({type: 'INPUT_BLUR'})
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
                    <input id='email' type='email' value={emailState.value} onChange={handleEmailChange} onBlur={handleValidateEmail} />
                    {/* label and input for username */}
                    <label htmlFor="username">Username</label>
                    <input id='username' value={userState.value} onChange={handleUsernameChange} onBlur={handleValidateUsername} />
                    {/* label and input for password */}
                    <label>Password</label>
                    <input id='password' value={passwordState.value} type='password' onChange={handlePasswordChange} onBlur={handleValidatePassword} />
                    {/* button for submit */}
                    <Button type='submit'>Create</Button>
                </form>
            </Card>
        </>
    )
}

export default AddUser