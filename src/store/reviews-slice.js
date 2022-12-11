import { createSlice } from '@reduxjs/toolkit'

// prepare a slice of global state with createSlice
const reviewSlice = createSlice({
    // always needs name and initial state
    name: 'reviews',
    initialState: [],
    reducers: {
        // one to get reviews
        getReviews(state, action) {
            state = action.payload
        },
        // one to add a new review
        addReview(state, action) {
            state = [...state, action.payload]
        }
    }
})

export const reviewActions = reviewSlice.actions

export default reviewSlice