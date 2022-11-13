import Card from "../UI/Card"
import styles from './AddUser.module.css'

const AddUser = props => {
    // function to handle add user
    const handleAddUser = event => {
        event.preventDefault()
    }

    // return form for username and password
    return(
        // add input class to card for styling
        <Card className={styles.input}>
            <form onSubmit={handleAddUser}>
                {/* label and input for email */}
                <label htmlFor="email">Email</label>
                <input id='email' type='email' />
                {/* label and input for username */}
                <label htmlFor="username">Username</label>
                <input id='username' />
                {/* label and input for password */}
                <label>Password</label>
                <input id='password' type='password' />
                {/* button for submit */}
                <button type="submit">Create</button>
            </form>
        </Card>
    )
}

export default AddUser