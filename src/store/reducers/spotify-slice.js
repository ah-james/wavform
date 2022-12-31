import { createSlice } from "@reduxjs/toolkit";

const spotifySlice = createSlice({
    name: 'spotify',
    initialState: {
        accessToken: ''
    },
    reducers: {
        authorizeSpotify(state, action) {
            state.accessToken = action.payload.access_token
        }
    }
})

export const spotifyActions = spotifySlice.actions

export default spotifySlice