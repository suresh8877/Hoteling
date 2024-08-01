import Adminpanel from "../pages/Adminpanel";
import Login from "../pages/Login"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
      </Routes>
      <Routes>
        <Route path="/adminpanel" element={<Adminpanel/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
