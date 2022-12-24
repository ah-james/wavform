import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { authActions } from "../../store/reducers/auth-slice";
import { setNewPassword } from '../../store/actions/auth-actions'

import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";

import styles from './Settings.module.css'

const API_KEY = 'AIzaSyCGjnmwkZY5oITWnh_LmZel4LrXpkrFyzw'

    // to do
    // build out validations, 
    // maybe light/dark mode 
    // delete profile
    // let user change username from email
const Settings = () => {
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const token = useSelector((state) => {
        return state.auth.token
    })

    const navigate = useNavigate()

    const handleSubmit = async event => {
        event.preventDefault()

        dispatch(setNewPassword(API_KEY, token, password))
        navigate('/')
    }

    return(
        <Card className={styles.home}>
            <h1>Change Password</h1>
            <form onSubmit={handleSubmit}>
                <Input label="Password" type="password" id='password' length='6' value={password} onChange={(event) => {setPassword(event.target.value)}} />
                <Button type='submit'>Submit</Button>
            </form>
        </Card>
    )
}

export default Settings