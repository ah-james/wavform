import { configureStore } from '@reduxjs/toolkit'
import reviewSlice from './reducers/reviews-slice'
import authSlice from './reducers/auth-slice'

const store = configureStore({
    reducer: {
        reviews: reviewSlice.reducer,
        auth: authSlice.reducer,
    }
})

export default store