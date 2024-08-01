import React,{useContext} from 'react'
import "./navbar.css"
import { Link } from 'react-router-dom'
import { AuthContext } from '../../utils/AuthContext'

function Navbar() {
  const{user,loading,error,dispatch}=useContext(AuthContext)

  return (
    <>

      <div className="navbar">
        <div className="navoptions">
          <Link to={'/'} style={{textDecoration:"none",color:"white"}}>
            <div className="navlogo">Hoteling</div>
          </Link>
          {user?user.name:
            <div className="navbtns">
              <button className='navbtn'>Register</button>
              <button className='navbtn'>Login</button>
            </div>
          }
        </div>
    </div>
    </>
  )
}

export default Navbar