import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import HomePage from './pages/Home'
import LoginPage from './pages/Login_page'
import ProtectedRoute from './pages/routes/ProtectedRoute';
import About from './pages/About';
import SbiPDF from './pages/pdf.jsx/sbiPdf';
import BankDetailsForm from './pages/pdf.jsx/BankDetailsForm';
import Dashboard from './pages/Editor_pdf/Viewer_Editor';


function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute/>}>
      <Route path='/' element={<LoginPage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/about' element={<About />} />
      <Route path='/sbiPDF' element={<SbiPDF />} />
      <Route path="/bankdetails" element={<BankDetailsForm />}/>
      <Route path="/dashboard" element={<Dashboard />} />
      
      </Route>
    </Routes>
  )
}

export default App
