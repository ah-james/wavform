import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/reducers/auth-slice";

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
    const [newPassword, setNewPassword] = useState('')

    const dispatch = useDispatch()
    const token = useSelector((state) => {
        return state.auth.token
    })

    const navigate = useNavigate()

    const handleSubmit = async event => {
        event.preventDefault()

        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`, {
            method: 'POST',
            body: JSON.stringify({
                idToken: token,
                password: newPassword,
                returnSecureToken: true
            }),
            headers: {'Content-Type': 'application/json'}
        })

        const data = await response.json()
        dispatch(authActions.setNewPassword(data.idToken))
        navigate('/home')
    }

    return(
        <Card className={styles.home}>
            <h1>Change Password</h1>
            <form onSubmit={handleSubmit}>
                <Input label="Password" type="password" id='password' length='6' value={newPassword} onChange={(event) => {setNewPassword(event.target.value)}} />
                <Button type='submit'>Submit</Button>
            </form>
        </Card>
    )
}

export default Settings