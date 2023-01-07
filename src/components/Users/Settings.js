import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { getAuth, deleteUser } from '@firebase/auth'

import { setNewPassword } from '../../store/actions/auth-actions'

import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";

import styles from './Settings.module.css'

const API_KEY = 'AIzaSyCGjnmwkZY5oITWnh_LmZel4LrXpkrFyzw'

// to do
// build out validations, 
// maybe light/dark mode?
// delete profile
// let user change username
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

    const deleteUser = () => {
        // handle an are you sure? situation
        // go into firebase, delete user that's currently logged in
    }

    return (
        <div>
            <Card className={styles.home}>
                <h1>Change Password</h1>
                <form onSubmit={handleSubmit}>
                    <Input label="Password" type="password" id='password' length='6' value={password} onChange={(event) => { setPassword(event.target.value) }} />
                    <Button type='submit'>Submit</Button>
                </form>
            </Card>
            <div className={styles.button}>
                {/* <Button handleClick={deleteUser}>Delete User</Button> */}
            </div>
        </div>
    )
}

export default Settings