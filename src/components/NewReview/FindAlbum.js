// libraries
import { useState } from "react"
import { useSelector } from "react-redux"
// UI components
import Button from "../UI/Button"
import Input from "../UI/Input"

const FindAlbum = ({ handleClick }) => {
    // useState: current queried input and holding response data returned from API
    const [query, setQuery] = useState('')
    const [options, setOptions] = useState([])

    const accessToken = useSelector(state => {
        return state.spotify.accessToken
    })

    const getAlbumOptions = async event => {
        if (query.length > 0) {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=album&limit=5`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            })

            if (!response.ok) {
                throw new Error(`Couldn't fetch albums data`)
            }

            const data = await response.json()

            setOptions(data.albums.items)
        }
    }

    const handleFoundAlbum = event => {
        event.preventDefault()
        handleClick(query)
    }

    return (
        <>
            <form onSubmit={handleFoundAlbum}>
                <Input list="albums" type='text' placeholder='Add an Album' value={query} onChange={(e) => { setQuery(e.target.value); getAlbumOptions(query) }} />
                <datalist id='albums'>
                    {query.length > 0 && options?.map((album, id) => {
                        return <option key={id}>{album.name} by {album.artists[0].name}</option>
                    })}
                </datalist>
                <Button>Find Album</Button>
            </form>
        </>
    )
}

export default FindAlbum