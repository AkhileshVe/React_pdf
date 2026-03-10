
import { useNavigate } from "react-router-dom";
import Navbar from "../NavBar";

export default function Dashboard() {

  const navigate = useNavigate();

  const banks = [
    {
      name: "State Bank of India",
      short: "SBI",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg"
    },
    {
      name: "Bank of India",
      short: "BOI",
      logo: "https://1000logos.net/wp-content/uploads/2021/06/Bank-of-India-logo.png"
    },
    {
      name: "HDFC Bank",
      short: "HDFC",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg"
    },
    {
      name: "ICICI Bank",
      short: "ICICI",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg"
    }
  ];

  return (
    <div className="services-page">
        <Navbar/>

      <h1>Select Your Bank</h1>

      <div className="bank-grid">

        {banks.map((bank, index) => (

          <div
            key={index}
            className="bank-card"
            onClick={() => navigate("/bankdetails", { state: bank })}
          >

            <img src={bank.logo}  alt={bank.short} />

            <h3>{bank.name}</h3>

          </div>

        ))}

      </div>

    </div>
  );
}
