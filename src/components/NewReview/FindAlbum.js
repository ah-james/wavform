// libraries
import PropTypes from "prop-types";
import { useState } from "react"
import { useSelector } from "react-redux"
// UI components
import Button from "../UI/Button"
import Input from "../UI/Input"
import FindAlbumDatalist from "./FindAlbumDatalist"

const FindAlbum = ({ handleClick }) => {
    // useState: current queried input and holding response data returned from API
    const [query, setQuery] = useState('')
    const [options, setOptions] = useState([])

    const accessToken = useSelector(state => {
        return state.spotify.accessToken
    })

    const getAlbumOptions = async () => {
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
                <FindAlbumDatalist query={query} options={options} />
                <Button>Find Album</Button>
            </form>
        </>
    )
}

FindAlbum.propTypes = {
    handleClick: PropTypes.func
}

export default FindAlbum