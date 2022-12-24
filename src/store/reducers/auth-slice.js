import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: '',
        email: '',
        loggedIn: false,
    },
    reducers: {
        setLoggedIn(state, action) {
            state.token = action.payload.idToken
            state.email = action.payload.email
            state.loggedIn = true
        },
        setLoggedOut(state, action) {
            state.token = ''
            state.email = ''
            state.loggedIn = false
        },
        setNewPassword(state, action) {
            state.token = action.payload
            state.loggedIn = true
        }
    },
})

export const authActions = authSlice.actions

export default authSlice

