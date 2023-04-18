import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: []
    },
    reducers: {
        getComments(state, action) {
            state.albums = action.payload
        },
        addComment(state, action) {
            state.albums = [...state.albums, action.payload]
        }
    }
})

export const commentActions = commentSlice.actions

export default commentSlice