import { useEffect, useReducer, useState } from "react"
import { useNavigate } from "react-router-dom"

import Card from "../UI/Card"
import Input from "../UI/Input"
import Button from '../UI/Button'
import styles from './LoginForm.module.css'

// finish this when I have the router up and running

const initialState = {
    value: '', 
    isValid: undefined
}

// username reducer function (outside component function because isn't being used to interact with any parts of state)
// action.type if statements
const reducer = (state, action) => {
    if (action.type === 'INPUT_CHANGE') {
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

const Login = props => {
    const [validForm, setValidForm] = useState(false)
    const [newAccount, setNewAccount] = useState(false)

    const navigate = useNavigate()

    // useReducer to combine both username states (takes 2 arguments, usernameReducer function and initial state)
    const [userState, dispatchUser] = useReducer(reducer, initialState)

    const [passwordState, dispatchPassword] = useReducer(reducer, initialState)

    const [emailState, dispatchEmail] = useReducer(reducer, initialState)

    // useContext to manage state

    // pull out isValid property and save them as constants to use in useEffect
    // won't update every time useReducer updates this way

    const { isValid: userIsValid } = userState
    const { isValid: passwordIsValid } = passwordState
    const { isValid: emailIsValid } = emailState

    // add useEffect to handle form validations
    useEffect(() => {
        // I think I have a memory leak and I've been told this might help I'm sorry for what I'm about to do
        const identifier = setTimeout(() => {
            setValidForm(
                userIsValid && passwordIsValid && emailIsValid
            )
        }, 500)
        return () => {
            clearTimeout(identifier)
        }

        // don't use userState etc objects in dependencies, effect function will rerun whenever any property of this changes
    }, [userIsValid, passwordIsValid, emailIsValid])

    const handleUsernameChange = event => {
        // dispatchUsername with keys of type (string explaining what's happening) and value (event.target.value)
        dispatchUser({ type: "INPUT_CHANGE", value: event.target.value })
    }

    const handlePasswordChange = event => {
        dispatchPassword({ type: 'INPUT_CHANGE', value: event.target.value })
    }

    const handleEmailChange = event => {
        dispatchEmail({ type: 'INPUT_CHANGE', value: event.target.value })
    }

    const handleValidateUsername = () => {
        // dispatchUsername with keys of type (string explaining what's happening for reducer)
        dispatchUser({ type: 'INPUT_BLUR' });
    };
    
    const handleValidatePassword = () => {
        dispatchPassword({ type: 'INPUT_BLUR' });
    };

    const handleValidateEmail = () => {
        dispatchEmail({ type: 'INPUT_BLUR' })
    }

    const handleLoginSubmit = (event) => {
        event.preventDefault()
        // prop to handle user login
        // navigate to navigate to new page
        navigate('/home')
        
    }

    const handleFormChange = () => {
        setNewAccount(current => !current)
    }

    let email = null

    if (newAccount === true) {
        email = <Input label="Email" id="email" isValid={emailIsValid} value={emailState.value} onChange={handleEmailChange} onBlur={handleValidateEmail} />
    }

    return(
        <Card className={styles["new-user"]}>
            <h2>{newAccount ? 'Sign Up' : 'Login'}</h2>
            <form onSubmit={handleLoginSubmit}>
                <div className={styles.controls}>
                    {email}
                    <Input label="Username" id="username" isValid={userIsValid} value={userState.value} onChange={handleUsernameChange} onBlur={handleValidateUsername} />
                    <Input label="Password" type="password" id='password' isValid={passwordIsValid} value={passwordState.value} onChange={handlePasswordChange} onBlur={handleValidatePassword} />
                </div>
                <div className={styles.actions}>
                    {/* button for submit */}
                    <Button type='submit' disabled={!validForm}>Login</Button>
                </div>
            </form>
            <p onClick={handleFormChange}>{newAccount ? 'Login to your Account' : 'Create New Account'}</p>
        </Card>
    )
}

export default Login