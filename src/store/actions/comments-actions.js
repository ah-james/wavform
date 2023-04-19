import { commentActions } from '../reducers/comments-slice'

export const fetchComments = () => {
    return async dispatch => {
        const fetchComments = async () => {
            const response = await fetch('https://react-bouncr-default-rtdb.firebaseio.com/comments.json')

            if (!response.ok) {
                throw new Error(`Couldn't fetch review data`)
            }
    
            const data = await response.json()
    
            const loadedComments = Object.entries(data).map((key, value) => ({
                id: key[0],
                reviewId: key[1].reviewId,
                text: key[1].text,
                userName: key[1].userName,
            }))
    
            return loadedComments
        }

        try {
            const commentData = await fetchComments()
            dispatch(commentActions.getComments(commentData))
        } catch (error) {
            console.log(error)
        }
    }
}

export const addComment = async (comment) => {
    return async dispatch => {
        const addData = async () => {
            const response = await fetch('https://react-bouncr-default-rtdb.firebaseio.com/comments.json', {
                method: 'POST',
                body: JSON.stringify({
                    reviewId: comment.reviewId,
                    text: comment.text,
                    userName: comment.userName,
                }),
                headers: { 'Content-Type': 'application/json' }
            })

            const data = await response.json()
            return data
        }

        try {
            const data = await addData()

            const createdComment = {
                id: data.name,
                reviewId: comment.reviewId,
                text: comment.text,
                userName: comment.userName,
            }

            dispatch(commentActions.addComment(createdComment))
        } catch (error) {
            console.log(error)
        }
    }
}