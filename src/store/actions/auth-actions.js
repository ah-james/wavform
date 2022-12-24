import { authActions } from '../reducers/auth-slice'

export const newOrLoginUser = (url, email, password) => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                }),
                headers: {'Content-Type': 'application/json'}
            })

            // setLoading(false)

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error.message)
            } 
            const data = await response.json()
            return data
        }

        try {
            const userData = await fetchData()
            dispatch(authActions.setLoggedIn(userData))
            localStorage.setItem('token', userData.idToken)
            localStorage.setItem('email', userData.email)
        } catch (error) {
            console.log(error)
        }
    }

}