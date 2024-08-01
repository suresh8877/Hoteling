import Home from "../pages/home/Home.jsx";
import Hotel from "../pages/hotel/Hotel.jsx";
import Hoteldetail from "../pages/hoteldetail/Hoteldetail.jsx";
import Login from "../pages/Login/Login.jsx";
import "./App.css"

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
      </Routes>
      <Routes>
        <Route path='/hotel' element={<Hotel/>}></Route>
      </Routes>
      <Routes>
        <Route path='/hoteldetail/:id' element={<Hoteldetail/>}></Route>
      </Routes>
      <Routes>
        <Route path='/Login' element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>

  )
}
export default App
