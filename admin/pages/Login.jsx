import React, { useContext, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext.jsx';

function Login() {
    const {user,loading,error,dispatch}=useContext(AuthContext);
    
    const navigate=useNavigate()

    const [credential, setcredential] = useState({
        "username":null,
        "password":null
    })
    const updater=(e)=>{
        setcredential((prev)=>(
            {...prev,[e.target.id]:e.target.value}
        ))
    }

    const handlelogin=async (e)=>{
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try{
            const res=await axios.post("http://localhost:8080/api/register/login",credential,{withCredentials: true});
            if(res.data.isadmin){
                dispatch({type:"LOGIN_SUCCEED",payload:res.data})
                console.log(res.data)
                navigate("/adminpanel")
            }
            else{
                console.log("Sorry not a admin")
            }
        }
        catch(err){
            console.log(err)
        }
    }
    const handlelogout=async (e)=>{
        e.preventDefault()
        try{
            dispatch({type:"LOG_OUT"})
            console.log("LOGOUT SUCCE")
        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <>
        <div>
            LOGIN
            <label htmlFor="username">username</label>
            <input onChange={(e)=>(updater(e))} id="username" type="text" />
            <label htmlFor="password">password</label>
            <input onChange={(e)=>(updater(e))} id="password" type="text" />
            <button onClick={(e)=>{handlelogin(e)}}>SUBMIT</button>
            <button onClick={(e)=>{handlelogout(e)}}>Logout</button>
        </div>
    </>
  )
}

export default Login