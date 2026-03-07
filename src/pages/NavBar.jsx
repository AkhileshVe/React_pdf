import "./navbar.css";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
export default function Navbar() {
    const navigate = useNavigate()

    const loginNavigation = () => {
        navigate("/")
    }

    return (
        <nav className="navbar">
            <div onClick={() => navigate("/home")}>
                <img src={Logo} alt="BankGen Logo" />
            </div>
            <ul className="nav-links">
                <li><a href="/home">Home</a></li>
                <li><a href="home#about">About</a></li>
                <li><a href="/bankdetails">Services</a></li>
                <li><a href="home#contact">Contact</a></li>
                {/* <li><a href="/sbiPdf">Generate</a></li> */}
            </ul>
            <button onClick={() => loginNavigation()} className="login-btn">Login</button>
        </nav>
    );
}