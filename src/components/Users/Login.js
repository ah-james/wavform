import { useEffect, useReducer, useState } from "react"
import Card from "../UI/Card"
import styles from './Login.module.css'

// finish this when I have the router up and running

// username reducer function (outside component function because isn't being used to interact with any parts of state)
// action.type if statements
const reducer = (state, action) => {
    if (action.type === 'USER_CHANGE') {
        return {
            value: action.value,
            isValid: action.value.length > 6
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

const Login = props => {
    // username and password state
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    // const [validUsername, setValidUsername] = useState()
    // const [validPassword, setValidPassword] = useState()
    const [validForm, setValidForm] = useState(false)

    // useReducer to combine both username states (takes 2 arguments, usernameReducer function and initial state)
    const [userState, dispatchUser] = useReducer(reducer, {
        value: '', 
        isValid: undefined
    })

    const [passwordState, dispatchPassword] = useReducer(reducer, {
        value: '',
        isValid: undefined
    })

    // add useEffect to handle form validations
    useEffect(() => {
        setValidForm(
            userState.isValid && passwordState.isValid
        )
        // don't need to add state updating functions, no setValidForm
    }, [userState, passwordState])

    const handleUsernameChange = event => {
        // dispatchUsername with keys of type (string explaining what's happening) and value (event.target.value)
        dispatchUser({type: "USER_CHANGE", value: event.target.value})
    }

    const handlePasswordChange = event => {
        dispatchPassword({type: 'PASS_CHANGE', value: event.target.value})
    }

    const handleValidateUsername = () => {
        // dispatchUsername with keys of type (string explaining what's happening for reducer)
        dispatchUser({type: 'INPUT_BLUR'});
    };
    
      const handleValidatePassword = () => {
        dispatchPassword({type: 'INPUT_BLUR'});
    };

    const handleLoginSubmit = (event) => {
        event.preventDefault()
        // prop to handle user login
        props.handleLogin(userState.value, passwordState.value)
    }

    return(
        <Card className={styles.login}>
            <form onSubmit={handleLoginSubmit}>
                <div className={`${styles.control} ${userState.isValid === false ? styles.invalid : ''}`}>
                    {/* label and input for username */}
                    <label htmlFor="username">Username</label>
                    <input id='username' value={userState.value} onChange={handleUsernameChange} onBlur={handleValidateUsername} />
                </div>
                <div className={`${styles.control} ${passwordState.isValid === false ? styles.invalid : ''}`}>
                    {/* label and input for password */}
                    <label htmlFor="password">Password</label>
                    <input id='password' value={passwordState.value} type='password' onChange={handlePasswordChange} onBlur={handleValidatePassword} />
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