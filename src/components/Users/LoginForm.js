import { useEffect, useReducer, useState } from "react"
import { useNavigate } from "react-router-dom"

import Card from "../UI/Card"
import Input from "../UI/Input"
import Button from '../UI/Button'
import Modal from '../UI/Modal'
import styles from './LoginForm.module.css'
import { useDispatch } from "react-redux"
import { newOrLoginUser } from '../../store/actions/auth-actions'

const initialState = {
    value: '',
    isValid: undefined
}

// reducer function (outside component function because isn't being used to interact with any parts of state)
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
    return { value: '', isValid: false }
}

const API_KEY = 'AIzaSyCGjnmwkZY5oITWnh_LmZel4LrXpkrFyzw'

// to do list:
//  - implement auto-logout
const Login = () => {
    const [validForm, setValidForm] = useState(false)
    const [newAccount, setNewAccount] = useState(false)
    const [error, setError] = useState()
    const [loading, setLoading] = useState()
    const [meterValue, setMeterValue] = useState(0)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [passwordState, dispatchPassword] = useReducer(reducer, initialState)
    const [emailState, dispatchEmail] = useReducer(reducer, initialState)

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
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`

        if (newAccount) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
        }

        dispatch(newOrLoginUser(url, emailState.value, passwordState.value, navigate, setLoading))
    }

    const handleFormChange = () => {
        setNewAccount(current => !current)
    }

    const handleError = () => {
        setError(null)
    }

    useEffect(() => {

        if (passwordState.value.length > 6) {
            setMeterValue(1)
        }

        if (passwordState.value.length > 6 && /[A-Z]/.test(passwordState.value)) {
            setMeterValue(2)
        }

        if (passwordState.value.length > 6 && /[A-Z]/.test(passwordState.value) && /[0-9]/.test(passwordState.value)) {
            setMeterValue(3)
        }

        if (passwordState.value.length > 6 && /[A-Z]/.test(passwordState.value) && /[0-9]/.test(passwordState.value) && /[@$!%*#?&]/.test(passwordState.value)) {
            setMeterValue(4)
        }

    }, [passwordState.value.length, passwordState.value])

    return (
        <>
            {error && <Modal title={error.title} message={error.message} handleAction={handleError} />}
            <Card className={styles["new-user"]}>
                <h2>{newAccount ? 'Sign Up' : 'Login'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.controls}>
                        <Input label="Email" type='email' id="email" isValid={emailIsValid} value={emailState.value} onChange={(event) => { handleChange(dispatchEmail, event) }} onBlur={() => { handleValidate(dispatchEmail) }} />
                        <Input label="Password" type="password" id='password' isValid={passwordIsValid} value={passwordState.value} onChange={(event) => { handleChange(dispatchPassword, event) }} onBlur={() => { handleValidate(dispatchPassword) }} />
                        <meter max="4" value={meterValue} className={styles["password-strength-meter"]}></meter>
                        {/* <p className={styles["password-strength-text"]}></p>  */} {/* eventually add a checklist of things that you should have in a password here */}
                    </div>
                    <div className={styles.actions}>
                        {/* button for submit */}
                        <p onClick={handleFormChange}>{newAccount ? 'Login to your Account' : 'Create New Account'}</p>
                        {loading ? <Button>Loading...</Button> : <Button type='submit' disabled={!validForm}>{newAccount ? 'Sign Up' : 'Login'}</Button>}
                    </div>
                </form>
            </Card>
        </>
    )
}

export default Login