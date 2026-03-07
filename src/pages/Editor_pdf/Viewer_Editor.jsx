import { useState } from "react";
import PdfPreview from "./Pdf_prev";
import BankForm from "./bankstate";

function Dashboard() {

  const [formData, setFormData] = useState({
    name: "",
    accountNumber: "",
    balance: ""
  });

  const [transactions, setTransactions] = useState([
    { date: "", description: "", debit: "", credit: "" }
  ]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* LEFT PDF */}
      <div style={{ width: "50%", borderRight: "1px solid #ddd" }}>
        <PdfPreview
          formData={formData}
          transactions={transactions}
        />
      </div>

      {/* RIGHT FORM */}
      <div style={{ width: "50%", padding: "20px", overflow: "auto" }}>
        <BankForm
          formData={formData}
          setFormData={setFormData}
          transactions={transactions}
          setTransactions={setTransactions}
        />
      </div>

    </div>
  );
}

export default Dashboard;