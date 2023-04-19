// libraries
import { configureStore } from '@reduxjs/toolkit'
// slices
import reviewSlice from './reducers/reviews-slice'
import authSlice from './reducers/auth-slice'
import spotifySlice from './reducers/spotify-slice'
import commentSlice from './reducers/comments-slice'

const store = configureStore({
    reducer: {
        reviews: reviewSlice.reducer,
        auth: authSlice.reducer,
        spotify: spotifySlice.reducer,
        comments: commentSlice.reducer,
    }
})

export default store