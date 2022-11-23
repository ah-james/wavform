import React from "react"

// create React Context component to connect app
const AuthContext = React.createContext({
    loggedIn: false
})

export default AuthContext