// components
import LoginForm from '../components/Users/LoginForm'

const LoginContainer = ({newAccount}) => {
    return (
        <div>
            <LoginForm newAccount={newAccount} />
        </div>
    )
}

export default LoginContainer 