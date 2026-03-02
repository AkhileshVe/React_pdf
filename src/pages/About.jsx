import { useNavigate } from "react-router-dom"

const About = () => {
    const navigate = useNavigate();
  return (
    <div>
       <div>
      <h2>About</h2>
      <button onClick={()=>navigate("/home")}>Logout</button>
    </div>
    </div>
  )
}

export default About;
