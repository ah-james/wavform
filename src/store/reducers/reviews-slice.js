import { createSlice } from '@reduxjs/toolkit'

// prepare a slice of global state with createSlice
const reviewSlice = createSlice({
    // always needs name and initial state
    name: 'reviews',
    initialState: {
        albums: []
    },
    reducers: {
        // NEVER preform side effects inside here (ex fetch)
        // one to get reviews
        getReviews(state, action) {
            state.albums = action.payload
        },
        // one to add a new review
        addReview(state, action) {
            state.albums = [...state.albums, action.payload]
        },
        deleteReview(state, action) {
            state.albums = [...state.albums.filter(album => album.id !== action.payload)]
        },
        editReview(state, action) {
            const index = state.albums.findIndex(album => action.payload.id === album.id)
            state.albums = [...state.albums.slice(0, index), action.payload, ...state.albums.slice(index + 1)]
        }
    }
})

export const reviewActions = reviewSlice.actions

export default reviewSlice