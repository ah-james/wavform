import { commentActions } from '../reducers/comments-slice'

export const fetchComments = async () => {
    return async dispatch => {
        const fetchComments = async () => {
            const response = await fetch('https://react-bouncr-default-rtdb.firebaseio.com/comments.json')
    
            const data = await response.json()
    
            const loadedComments = Object.entries(data).map((key, value) => ({
                reviewId: key[0],
                text: key[1].text,
                userName: key[1].userName,
            }))
    
            return loadedComments
        }

        try {
            const commentData = fetchComments()
            dispatch(commentActions.getComments(commentData))
        } catch (error) {
            console.log(error)
        }
    }
}