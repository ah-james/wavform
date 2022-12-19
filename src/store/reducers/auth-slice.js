import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: '',
        loggedIn: false,
    },
    reducers: {
        setLoggedIn(state, action) {
            state.token = action.payload
            state.loggedIn = true
        },
        setLoggedOut(state, action) {
            state.token = ''
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

