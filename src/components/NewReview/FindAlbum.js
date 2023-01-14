import useInput from "../../hooks/use-input"
import Button from "../UI/Button"
import Input from "../UI/Input"


const FindAlbum = props => {

    const {
        value: album,
        handleValueChange: handleAlbumChange,
    } = useInput(value => value.trim() !== '')

    const handleFoundAlbum = event => {
        event.preventDefault()

        props.handleClick(album)
    }

    return(
        <>
            <form onSubmit={handleFoundAlbum}>
                <Input id="album" type='text' label='Add an Album' value={album} onChange={handleAlbumChange} />
                <Button>Find Album</Button>
            </form>
        </>
    )
}

export default FindAlbum