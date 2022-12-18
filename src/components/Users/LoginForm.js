import { useEffect, useReducer, useState } from "react"
import { useNavigate } from "react-router-dom"

import Card from "../UI/Card"
import Input from "../UI/Input"
import Button from '../UI/Button'
import ErrorModal from '../UI/ErrorModal'
import styles from './LoginForm.module.css'
import { useDispatch } from "react-redux"
import { authActions } from "../../store/reducers/auth-slice"

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

const API_KEY = 'AIzaSyCGjnmwkZY5oITWnh_LmZel4LrXpkrFyzw'

const Login = props => {
    const [validForm, setValidForm] = useState(false)
    const [newAccount, setNewAccount] = useState(false)
    const [error, setError] = useState()
    const [loading, setLoading] = useState()

    const navigate = useNavigate() 
    const dispatch = useDispatch()

    // useReducer to combine both username states (takes 2 arguments, usernameReducer function and initial state)

    const [passwordState, dispatchPassword] = useReducer(reducer, initialState)

    const [emailState, dispatchEmail] = useReducer(reducer, initialState)

    // useContext to manage state

    // pull out isValid property and save them as constants to use in useEffect
    // won't update every time useReducer updates this way

    const { isValid: passwordIsValid } = passwordState
    const { isValid: emailIsValid } = emailState

    // add useEffect to handle form validations
    useEffect(() => {
        // I think I have a memory leak and I've been told this might help I'm sorry for what I'm about to do
        const identifier = setTimeout(() => {
            if (newAccount === true) {
                setValidForm( 
                    passwordIsValid && emailIsValid
                )
            }
            setValidForm( 
                passwordIsValid
            )
        }, 500)
        return () => {
            clearTimeout(identifier)
        }

        // don't use userState etc objects in dependencies, effect function will rerun whenever any property of this changes
    }, [passwordIsValid, emailIsValid, newAccount])

    const handleChange = (dispatch, event) => {
        // dispatchUsername with keys of type (string explaining what's happening) and value (event.target.value)
        dispatch({ type: "INPUT_CHANGE", value: event.target.value })
    }

    const handleValidate = dispatch => {
        dispatch({ type: 'INPUT_BLUR' })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        let url
        if (newAccount) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
        } else {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: emailState.value,
                    password: passwordState.value,
                    returnSecureToken: true
                }),
                headers: {'Content-Type': 'application/json'}
            })

            setLoading(false)

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error.message)
            } 
            const data = await response.json()
            console.log(data)
            dispatch(authActions.setLoggedIn(data.idToken))
            navigate('/home')

        } catch (error) {
            alert(error)
        }
    }

    const handleFormChange = () => {
        setNewAccount(current => !current)
    }

    const handleError = () => {
        setError(null)
    }

    return(
        <>
            {error && <ErrorModal title={error.title} message={error.message} handleError={handleError} />}
            <Card className={styles["new-user"]}>
                <h2>{newAccount ? 'Sign Up' : 'Login'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.controls}>
                        <Input label="Email" type='email' id="email" isValid={emailIsValid} value={emailState.value} onChange={(event) => {handleChange(dispatchEmail, event)}} onBlur={() => {handleValidate(dispatchEmail)}} />
                        <Input label="Password" type="password" id='password' isValid={passwordIsValid} value={passwordState.value} onChange={(event) => {handleChange(dispatchPassword, event)}} onBlur={() => {handleValidate(dispatchPassword)}} />
                    </div>
                    <div className={styles.actions}>
                        {/* button for submit */}
                        <p onClick={handleFormChange}>{newAccount ? 'Login to your Account' : 'Create New Account'}</p>
                        {loading ? <p>Loading...</p> : <Button type='submit' disabled={!validForm}>{newAccount ? 'Sign Up' : 'Login'}</Button>}
                    </div>
                </form>
            </Card>
        </>
    )
}

export default Login