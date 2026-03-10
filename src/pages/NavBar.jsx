import "./navbar.css";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { HashLink } from "react-router-hash-link";

export default function Navbar() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("isAuth");
        navigate("/");
    };

    return (
        <nav className="navbar">

            <div onClick={() => navigate("/home")}>
                <img src={Logo} alt="BankGen Logo" />
            </div>

            <ul className="nav-links">

                <li>
                    <Link smooth to="/home">Home</Link>
                </li>

                <li>
                    <HashLink smooth={true} to="/home#about">About</HashLink>
                </li>

                <li>
                    <Link smooth to="/bankdetails">Services</Link>
                </li>

                <li>
                    <HashLink smooth to="/home#contact">Contact</HashLink>
                </li>

            </ul>

            <button onClick={logout} className="login-btn">
                Logout
            </button>

        </nav>
    );
}