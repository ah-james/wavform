import Button from "../UI/Button"
import Input from "../UI/Input"


const FindAlbum = props => {

    const handleFoundAlbum = event => {
        event.preventDefault()

        props.handleClick()
    }

    return(
        <>
            <form onSubmit={handleFoundAlbum}>
                <Input id="album" type='text' label='Add an Album' />
                <Button>Find Album</Button>
            </form>
        </>
    )
}

export default FindAlbum