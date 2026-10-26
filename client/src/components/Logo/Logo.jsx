import './Logo.css'
import logo from '../../assets/image_2026-10-26_03-19-40.png'

function Logo() {
    return (
        <a href="http://localhost:5173/">
            <img width="288px" src={logo} alt="logo"/>
        </a>
    )
}

export default Logo
