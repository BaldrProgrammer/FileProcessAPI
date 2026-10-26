import './Logo.css'
import logo from '../../assets/logo.png'

function Logo() {
    return (
        <a href="http://localhost:5173/">
            <img src={logo} alt="logo"/>
        </a>
    )
}

export default Logo
