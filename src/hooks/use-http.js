import {useState } from "react"

const useHttp = (requestConfig, applyData) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const sendRequest = async () => {
        // event.preventDefault()
        // setLoading to true
        setLoading(true)
        // reset errors to null
        setError(null)

        const searchParameters = {
            // set defaults for all of these, in case nothing's sent
            method: requestConfig.method ? requestConfig.method : 'GET',
            headers: requestConfig.headers ? requestConfig.headers : {},
            body: JSON.stringify(requestConfig.body) ? JSON.stringify(requestConfig.body) : null
        }

        try {
            // GET an artist via search
            const response = await fetch(requestConfig.url, searchParameters)

            // if the response fails throw a new error
            if (!response.ok) {
                throw new Error('Something went wrong')
            }

            const data = await response.json()
            applyData(data)

        } catch (error) {
            setError(error.message)
        }
        // setLoading to false
        setLoading(false)
    }

    return {
        loading,
        error,
        sendRequest
    }
}

export default useHttp