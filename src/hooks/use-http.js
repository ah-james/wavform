import { useCallback, useState } from "react"

const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // move requestConfig and applyData to sendRequest instead of useHttp so app component doesn't rerender constantly
    // since it's the function where both are being called
    const sendRequest = useCallback(async (requestConfig, applyData) => {
        // event.preventDefault()
        // setLoading to true
        setLoading(true)
        // reset errors to null
        setError(null)

        const parameters = {
            // set defaults for all of these, in case nothing's sent
            method: requestConfig.method ? requestConfig.method : 'GET',
            headers: requestConfig.headers ? requestConfig.headers : {},
            body: JSON.stringify(requestConfig.body) ? JSON.stringify(requestConfig.body) : null
        }

        try {
            // GET an artist via search
            const response = await fetch(requestConfig.url, parameters)

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
    }, [])

    return {
        loading,
        error,
        sendRequest
    }
}

export default useHttp