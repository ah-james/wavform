import React, { useEffect, useState } from "react"

// create React Context component to connect app
const AuthContext = React.createContext({
    loggedIn: false,
    handleLogout: () => {},
})

// create AuthContextProvider component accepting props inside AuthContext.Provider, export this
export const AuthContextProvider = props => {
    // can manage loggedIn state here isntead of in app.js
    const [loggedIn, setLoggedIn] = useState(false)

    // useEffect hook to handle sideeffect of storing logged in user
    // code is ran whenever dependencies are changed
    // ex. run check on localStorage when app starts up, then again if state dependency is updated
    useEffect(() => {
        const savedData = localStorage.getItem('isLoggedIn')
    
        if (savedData === '1') {
          setLoggedIn(true)
        }
    }, [])

    // move handleLogin and handleLogout functions

    const handleLogin = (email, password) => {
        // use localStorage.setItem to dummy storiing loggin in
        localStorage.setItem('isLoggedIn', '1')
        setLoggedIn(true)
    }
    
    const handleLogout = () => {
        // localstorage.removeitem to remove dummy
        localStorage.removeItem('isLoggedIn')
        setLoggedIn(false)
    }

    // return value of state, functions in react component
    return (
        <AuthContext.Provider value={{
            loggedIn: loggedIn,
            handleLogout: handleLogout,
            handleLogin: handleLogin,
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext