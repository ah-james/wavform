// libraries
import PropTypes from "prop-types";
import { useCallback, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// UI components
import Button from "../UI/Button"
import Input from "../UI/Input"
import FindAlbumDatalist from "./FindAlbumDatalist"
// store
import { populateDatalist } from '../../store/actions/spotify-actions'

const FindAlbum = ({ handleClick }) => {
    // useState: current queried input and holding response data returned from API
    const [query, setQuery] = useState('')
    const [options, setOptions] = useState([])

    const dispatch = useDispatch()

    const accessToken = useSelector(state => {
        return state.spotify.accessToken
    })

    const getAlbumOptions = useCallback (async (event) => {
        setQuery(event.target.value)
        if (query.length > 0) {
            const albumOptions = dispatch(populateDatalist(query, accessToken))
            setOptions(albumOptions)
        }
    }, [query, accessToken, dispatch])

    // use debounce function to avoid making too many calls to Spotify API
    const debounce = (callback, wait) => {
        let timerId;
        return function (...args) {
            const context = this;
            if (timerId) clearTimeout(timerId)
            timerId = setTimeout(() => {
                timerId = null
                callback.apply(context, args)
            }, wait);
        };
    }

    const debouncedResults = useMemo(() => debounce(getAlbumOptions, 300), [getAlbumOptions]);

    const handleFoundAlbum = event => {
        event.preventDefault()
        handleClick(query)
    }

    return (
        <>
            <form onSubmit={handleFoundAlbum}>
                <Input list="albums" type='text' placeholder='Add an Album' onChange={debouncedResults} />
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