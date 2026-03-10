import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaGoogle, FaFacebook, FaInstagram } from "react-icons/fa";
import "./login.css";
import Logo from "../assets/logo.svg";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }
    if (password == "1234") {
      localStorage.setItem("isAuth", true)
      navigate("/home", { replace: true });

    } else {
      alert("Incorrect password");
    }
    console.log({ email, password });
  }

  return (

    <div className="login-container">

      <div className="login-card">

        {/* Left Side */}

        <div className="login-left">

          <h1>BankGen</h1>

          <p>
            Banking PDF Generator helps you create realistic
            bank statements instantly for testing and development.
          </p>

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135706.png"
            alt="banking"
          />

        </div>


        {/* Right Side */}

        <div className="login-right">

          <div><img src={Logo} alt="BankGen Logo" /></div>
          <h2>Login</h2>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <div className="input-group80"> <label >Email</label></div>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">

              <div className="input-group80"> <label >Password</label></div>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="login-btnn">
              Login
            </button>

          </form>

          {/* Social Login */}

          <div className="social-login">

            <p>Or login with</p>

            <div className="social-icons">

              <FaGoogle className="icon google" />
              <FaFacebook className="icon facebook" />
              <FaInstagram className="icon instagram" />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;