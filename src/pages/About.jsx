import axios from "axios";

function GeneratePDF() {

 const handleGenerate = async () => {
  const res = await axios.post("http://127.0.0.1:8000/generate-pdf/", {
  accountName: "satyapal",
  accountNumber: "42511739493",
  ifsc: "SBIN0001499",
  address: "S/O: Jayprakash Rajput...",

  accountDescription: "...",
  branch: "...",
  drawingPower: "0.00",
  interestRate: "2.5",
  modeBalance: "0.00",
  cifNo: "67262931429",
  ckycrNumber: "XXXXXXXX1234",
  micrCode: "462002502",
  nominationRegistered: "No",
  balance: "43,235.00",

  fromDate: "21 Jul 2025",
  toDate: "21 Jan 2026",

  openingBalance: 43235,
  salaryAmount: 65000,
  company: "AIR INDIA LIMITED"
}, {
  responseType: "blob"
});

  const url = window.URL.createObjectURL(new Blob([res.data]));
  const a = document.createElement("a");
  a.href = url;
  a.download = "statement.pdf";
  a.click();
};

  return (
    <div style={{ padding: "20px" }}>
      <h2>Generate PDF</h2>

      <button onClick={handleGenerate}>
        Generate PDF
      </button>
    </div>
  );
}

export default GeneratePDF;