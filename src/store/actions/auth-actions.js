import { authActions } from '../reducers/auth-slice'
import { authorizeSpotify } from './spotify-actions'


export const newOrLoginUser = (url, email, password, navigate, setLoading) => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                }),
                headers: { 'Content-Type': 'application/json' }
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
            dispatch(authorizeSpotify())
            localStorage.setItem('token', userData.idToken)
            localStorage.setItem('email', userData.email)
            localStorage.setItem('expirationTime', Date.now() + userData.expiresIn * 1000)
            setTimeout(function () {
                navigate('/')
            }, 500)
        } catch (error) {
            setLoading(false)
            alert(error)
        }
    }

}

export const autoLogout = navigate => {
    const expirationTime = localStorage.getItem('expirationTime')
    const calculateRemainingTime = expirationTime => expirationTime - Date.now()
    const remainingTime = calculateRemainingTime(expirationTime);

    return (dispatch) => {
      setTimeout(() => {
        dispatch(authActions.setLoggedOut());
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('expirationTime')
        navigate('/')
      }, remainingTime);
    };
};

export const setNewPassword = (API_KEY, token, password) => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`, {
                method: 'POST',
                body: JSON.stringify({
                    idToken: token,
                    password: password,
                    returnSecureToken: true
                }),
                headers: { 'Content-Type': 'application/json' }
            })

            const data = await response.json()
            return data
        }

        const userData = await fetchData()
        dispatch(authActions.setNewPassword(userData.idToken))
    }
}