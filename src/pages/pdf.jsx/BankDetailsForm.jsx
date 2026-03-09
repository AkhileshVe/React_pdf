import { useState } from "react";
import "./BankDetailsForm.css";
import Navbar from "../NavBar";
import { useNavigate } from "react-router-dom";
export default function BankDetailsForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    accountName: "",
    address: "",
    date: "",
    accountNumber: "",
    accountDescription: "",
    branch: "",
    drawingPower: "",
    cifNo: "",
    ckycrNumber: "",
    ifsCode: "",
    micrCode: "",
    nominationRegistered: "",
    balance: 0,
    salaryCompany: "",
    salaryAmount: 0,
    modeBalance: 0,
    interestRate: 0,
    pdf_type: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {

    let newErrors = {};

    if (!form.accountName.trim())
      newErrors.accountName = "Account name required";

    if (!form.address.trim())
      newErrors.address = "Address required";

    if (!form.date)
      newErrors.date = "Date required";

    if (!/^\d{11,18}$/.test(form.accountNumber))
      newErrors.accountNumber = "Invalid account number";

    if (!form.accountDescription)
      newErrors.accountDescription = "Required";

    if (!form.branch)
      newErrors.branch = "Branch required";

    if (!form.cifNo)
      newErrors.cifNo = "CIF number required";

    if (!form.drawingPower)
      newErrors.drawingPower = "Drawing Power required";
    
    if (!form.pdf_type)
      newErrors.pdf_type = "PDF type required";

    if (!form.modeBalance)
      newErrors.modeBalance = "Mode Balance required";

    if (!form.interestRate)
      newErrors.interestRate = "Interest Rate required";

    if (!form.salaryCompany)
      newErrors.salaryCompany = "salary Company Name required";

    if (!form.salaryAmount)
      newErrors.salaryAmount = "salary Amount is required";

    if (!form.ckycrNumber)
      newErrors.ckycrNumber = "CKYCR number required";

    if (!/^SBIN\d{7}$/.test(form.ifsCode))
      newErrors.ifsCode = "Invalid IFSC code";

    if (!/^\d{9}$/.test(form.micrCode))
      newErrors.micrCode = "Invalid MICR code";

    if (!form.balance)
      newErrors.balance = "Balance required";

    

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    navigate("/sbiPDF", { state: form })
    alert("Form Submitted Successfully");
    console.log(form);
  };

  return (
    <div>
      <Navbar />
      <div className="formContainer">
        <div className="form-container">

          <h2>Bank Details Form</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>PDF TYPE         :</label>
              <select name="pdf_type" onChange={handleChange} className={errors.pdf_type ? "error-input" : ""}>
                <option value="">Select</option>
                <option value="Salary">credit Salary</option>
                <option value="Self_Employee">Self Employee</option>
                <option value="Salaried_banking">Salaried banking</option>
              </select>
               {errors.pdf_type && <span className="error">{errors.pdf_type}</span>}
            </div>


            <div className="form-group">
              <label>Account Name      :</label>
              <div className="form-group1">
                <input
                  placeholder="Account Name"
                  name="accountName"
                  onChange={handleChange}
                  className={errors.accountName ? "error-input" : ""}
                />
                {errors.accountName && <span className="error">{errors.accountName}</span>}
              </div></div>

            <div className="form-group">
              <label>Address    :</label>
              <div className="form-group1">
                <textarea
                  name="address"
                  placeholder="Address"
                  onChange={handleChange}
                  className={errors.address ? "error-input" : ""}
                />
                {errors.address && <span className="error">{errors.address}</span>}
              </div></div>

            <div className="form-group">
              <label>Date      :</label>
              <div className="form-group1" >
                <input
                  type="date"
                  name="date"
                  onChange={handleChange}
                  className={errors.date ? "error-input" : ""}
                />
                {errors.date && <span className="error">{errors.date}</span>}
              </div>
            </div>
            <div className="form-group">
              <label>Account Number   :</label>
              <div className="form-group1">
                <input
                  placeholder="Account Number"
                  name="accountNumber"
                  onChange={handleChange}
                  className={errors.accountNumber ? "error-input" : ""}
                />
                {errors.accountNumber && <span className="error">{errors.accountNumber}</span>}
              </div></div>

            <div className="form-group">
              <label>Account Description    :</label>
              <div className="form-group1">
                <input
                  placeholder="Account Description"
                  name="accountDescription"
                  onChange={handleChange}
                  className={errors.accountDescription ? "error-input" : ""}
                />
                {errors.accountDescription && <span className="error">{errors.accountDescription}</span>}
              </div></div>

            <div className="form-group">
              <label>Branch       :</label>
              <div className="form-group1">
                <input
                  placeholder="Branch"
                  name="branch"
                  onChange={handleChange}
                  className={errors.branch ? "error-input" : ""}
                />
                {errors.branch && <span className="error">{errors.branch}</span>}
              </div></div>

            <div className="form-group">
              <label>Drawing Power      :</label>
              <div className="form-group1">
                <input
                  placeholder="drawingPower"
                  name="drawingPower"
                  onChange={handleChange}
                  className={errors.drawingPower ? "error-input" : ""}
                />
                {errors.drawingPower && <span className="error">{errors.drawingPower}</span>}
              </div></div>

            <div className="form-group">
              <label>Interest Rate(% p.a.)  :</label>
              <div className="form-group1">
                <input
                  placeholder="interestRate"
                  name="interestRate"
                  onChange={handleChange}
                  className={errors.interestRate ? "error-input" : ""}
                />
                {errors.interestRate && <span className="error">{errors.interestRate}</span>}
              </div></div>


            <div className="form-group">
              <label>MOD Balance         :</label>
              <div className="form-group1">
                <input
                  placeholder="modeBalance"
                  name="modeBalance"
                  onChange={handleChange}
                  className={errors.modeBalance ? "error-input" : ""}
                />
                {errors.modeBalance && <span className="error">{errors.modeBalance}</span>}
              </div></div>









            <div className="form-group">
              <label>CIF Number      :</label>
              <div className="form-group1">
                <input
                  placeholder="CIF Number"
                  name="cifNo"
                  onChange={handleChange}
                  className={errors.cifNo ? "error-input" : ""}
                />
                {errors.cifNo && <span className="error">{errors.cifNo}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>CKYCR Number      :</label>
              <div className="form-group1">
                <input
                  placeholder="CKYCR Number"
                  name="ckycrNumber"
                  onChange={handleChange}
                  className={errors.ckycrNumber ? "error-input" : ""}
                />
                {errors.ckycrNumber && <span className="error">{errors.ckycrNumber}</span>}
              </div></div>

            <div className="form-group">
              <label>IFSC Code.     :</label>
              <div className="form-group1">
                <input
                  placeholder="IFSC Code"
                  name="ifsCode"
                  onChange={handleChange}
                  className={errors.ifsCode ? "error-input" : ""}
                />
                {errors.ifsCode && <span className="error">{errors.ifsCode}</span>}
              </div></div>

            <div className="form-group">
              <label>MICR Code       :</label>
              <div className="form-group1">
                <input
                  placeholder="MICR Code"
                  name="micrCode"
                  onChange={handleChange}
                  className={errors.micrCode ? "error-input" : ""}
                />
                {errors.micrCode && <span className="error">{errors.micrCode}</span>}
              </div></div>



            <div className="form-group">
              <label>Salary Company Name  :</label>
              <div className="form-group1">
                <input
                  placeholder="salaryCompany"
                  name="salaryCompany"
                  onChange={handleChange}
                  className={errors.salaryCompany ? "error-input" : ""}
                />
                {errors.salaryCompany && <span className="error">{errors.salaryCompany}</span>}
              </div></div>

            <div className="form-group">
              <label>Salary Amount     :</label>
              <div className="form-group1">
                <input
                  placeholder="salaryAmount"
                  name="salaryAmount"
                  onChange={handleChange}
                  className={errors.salaryAmount ? "error-input" : ""}
                />
                {errors.salaryAmount && <span className="error">{errors.salaryAmount}</span>}
              </div></div>

            <div className="form-group">
              <label>Nomination Registered     :</label>
              <select name="nominationRegistered" onChange={handleChange}>
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="form-group">
              <label>Opening Balance     :</label>
              <div className="form-group1">
                <input
                  placeholder="Opening Balance"
                  name="balance"
                  onChange={handleChange}
                  className={errors.balance ? "error-input" : ""}
                />
                {errors.balance && <span className="error">{errors.balance}</span>}
              </div></div>

            <button type="submit">Generate Statement</button>

          </form>
        </div>
      </div>
    </div>
  );
}