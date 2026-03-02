import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import HomePage from './pages/Home'
import LoginPage from './pages/Login_page'
import ProtectedRoute from './pages/routes/ProtectedRoute';
import About from './pages/About';
import SbiPDF from './pages/pdf.jsx/sbiPdf';


function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute/>}>
      <Route path='/' element={<LoginPage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/about' element={<About />} />
      <Route path='/sbiPDF' element={<SbiPDF />} />
      </Route>
    </Routes>
  )
}

export default App
