import { configureStore } from '@reduxjs/toolkit'
import reviewSlice from './reviews-slice'

const store = configureStore({
    reducer: {
        reviews: reviewSlice.reducers
    }
})

export default store