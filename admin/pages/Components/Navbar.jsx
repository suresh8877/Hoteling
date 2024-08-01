import React ,{useContext,useState}from 'react'
import "./Navbar.css"
import { AuthContext } from '../../utils/AuthContext.jsx';

function Navbar() {

    const {user,loading,error,dispatch}=useContext(AuthContext);
    
    return (
    <>
        <div className="navbar">
            <div className="navcontainer">
                <div className="logo">HOTELING ADMIN PANEL</div>
                <div className="usercontrol">
                    <div className="userprofile">
                        <div>{user.name}</div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar