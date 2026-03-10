import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./NavBar";
import Footer from "./footer";
import "./home.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaFilePdf, FaExchangeAlt, FaLock, FaChartLine } from "react-icons/fa";
  import { Viewer } from "@react-pdf-viewer/core";
  let aaa = [1,2,3,4,5,6,7]
  for (let i= aaa.length; 1 >=i ;i--){
    console.log(i)
  }


function HomePage() {
  let navigation = useNavigate()
  let arr = ()=>{

}

  useEffect(() => {
    arr()
    AOS.init();
  }, []);
  return (
    <div className="maincontainer">
      <Navbar />
      <section id="home" className="section home">

        <div className="container">
          <div className="home-left">
            <h1 className="fade-in">
              Generate Professional Bank Statements Instantly
            </h1>
            <p>
              Banking PDF Generator helps you create professional bank statement
              PDFs easily for testing, development, and fintech integrations.
            </p>
          

            <button className="primary-btn" onClick={()=>navigation("/bankdetails")}>Generate Now</button>
          </div>

          <div className="home-right">
            <img
              className="float"
              src="https://cdn-icons-png.flaticon.com/512/3135/3135706.png"
              alt="bank"
            />
          </div>

        </div>

      </section>




<section className="features-section">

      <h2 className="features-title">Powerful Banking Tools</h2>

      <div className="features-grid">

        <div className="feature-card">
          <FaFilePdf className="feature-icon" />
          <h3>PDF Statement Generator</h3>
          <p>
            Instantly generate realistic bank statements with
            dynamic transactions for development and testing.
          </p>
        </div>

        <div className="feature-card">
          <FaExchangeAlt className="feature-icon" />
          <h3>Transaction Simulation</h3>
          <p>
            Simulate debit, credit, salary, and UPI transactions
            automatically across multiple months.
          </p>
        </div>

        <div className="feature-card">
          <FaChartLine className="feature-icon" />
          <h3>Balance Analytics</h3>
          <p>
            Track balances and transaction patterns with
            automatically calculated running balances.
          </p>
        </div>

        <div className="feature-card">
          <FaLock className="feature-icon" />
          <h3>Secure Testing</h3>
          <p>
            Generate mock banking data safely without using
            real customer financial information.
          </p>
        </div>

      </div>

    </section>



      <section id="about" className="section about">

        <div data-aos="fade-up">
          <h2>About Our Platform</h2>
        </div>

        <p style={{width:"700px"}}> 
          Banking PDF Generator is a modern tool designed for developers,
          testers and fintech applications to create realistic bank
          statements in PDF format.
        </p>

        <div className="about-cards">

          <div className="card">
            <h3>⚡ Fast Generation</h3>
            <p>Create bank statements instantly with automated transaction data.</p>
          </div>

          <div className="card">
            <h3>🔒 Secure</h3>
            <p>Your data stays local in the browser and is never stored.</p>
          </div>

          <div className="card">
            <h3>📄 Realistic PDF</h3>
            <p>Generate realistic bank statements for development testing.</p>
          </div>

        </div>

      </section>


      <section id="contact" className="section contact">

        <h2>Contact Us</h2>

        <form className="contact-form">

          <div className="input-group">
            <div className="input-group80"> <label >Name</label></div>
            <input type="text" placeholder="Enter your name" />
          </div>

          <div className="input-group">
            <div className="input-group80"> <label >Email</label></div>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className="input-group">
            <div className="input-group80"> <label >Message</label></div>
            <textarea placeholder="Write your message"></textarea>
          </div>

          <button type="submit" className="primary-btn">
            Send Message
          </button>

        </form>

      </section>

         <Footer />
    </div>
  )
}

export default HomePage;