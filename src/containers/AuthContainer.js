import LoginForm from '../components/Users/LoginForm'

const LoginContainer = props => {
    return (
        <div>
            <LoginForm newAccount={props.newAccount} />
        </div>
    )
}

export default LoginContainer 