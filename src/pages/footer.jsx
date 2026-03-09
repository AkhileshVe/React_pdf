// import "./footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import Logo from "../assets/logo.svg";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Left Section */}
        <div className="footer-col">
             <img src={Logo} alt="BankGen Logo" />

          <div className="social">
            <FaLinkedinIn />
            <FaTwitter />
            <FaFacebookF />
            <FaInstagram />
          </div>

          <div className="badge">
            <img src="/saashub.png" alt="saas" />
          </div>

          <div className="badge">
            <img src="/producthunt.png" alt="producthunt" />
          </div>
        </div>

        {/* Address */}
        <div className="footer-col">
          <h3>Registered Address</h3>
          <p>
            Madan Lal kothri,<br/>
           ward number 04 , kothri 731/2389,<br/>
            Mainakhedi-466114<br/>
            Sehore,<br/>
            Madhya pradesh
          </p>

          <p>info@bankpdf.com</p>
          <p>sales@bankpdf.com</p>
        </div>

        {/* Products */}
        <div className="footer-col">
          <h3>Products</h3>
          <ul>
            <li>Expense Manager</li>
            <li>Account Aggregator</li>
            <li>Alternate Data Suite</li>
            <li>Onboarding Suite</li>
            <li>Bank Statement Analyzer</li>
            <li>Mobile APIs</li>
          </ul>
        </div>

        {/* Links */}
        <div className="footer-col">
          <h3>Useful Links</h3>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Cookies Policy</li>
            <li>Grievance Policy</li>
          </ul>

          <h3 className="service-title">Services</h3>
          <ul>
            <li>Check Credit Score</li>
          </ul>
        </div>

      </div>

      <div className="copyright">
        © Copyright by BankPDF Technologies Pvt Ltd 2026. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;