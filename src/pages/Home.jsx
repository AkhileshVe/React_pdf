import { useNavigate } from "react-router-dom"; 
 
 function HomePage() {
  let navigation =useNavigate()
  return (
    <div>

      <h2>About</h2>
<button onClick={()=>navigation("/")}>login</button>
    </div>
  );
}

export default HomePage;