// libraries
import PropTypes from "prop-types";
// components
import LoginForm from '../components/Users/LoginForm'

const LoginContainer = ({newAccount}) => {
    return (
        <div>
            <LoginForm newAccount={newAccount} />
        </div>
    )
}

LoginContainer.propTypes = {
    newAccount: PropTypes.bool
}

export default LoginContainer 