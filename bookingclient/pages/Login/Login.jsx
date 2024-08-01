import { useNavigate } from 'react-router-dom';
import React, { useContext,useState } from 'react'
import { AuthContext } from '../../utils/AuthContext.jsx'
import axios from 'axios'

function Login() {
    const{user,loading,error,dispatch}=useContext(AuthContext)
    const [credential, setcredential] = useState({
        "username":undefined,
        "password":undefined
    })
    const navigate=useNavigate();
    const updatecred=(e)=>{
        setcredential((c)=>({
            ...c,[e.target.id]:e.target.value
        }))
    }
    const handlelogin=async (e)=>{
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try{
            const res=await axios.post("http://localhost:8080/api/register/login",credential)
            console.log(res.data);
            dispatch({type:"LOGIN_SUCCESS",payload:res.data})
            navigate("/")
        }
        catch(err){
            dispatch({type:"LOGIN_FAILURE",payload:err.response.data})
        }
    }
    const handlelogout=(e)=>{
        e.preventDefault()
        dispatch({type:"LOG_OUT"})
        navigate("/")
    }
  return (
    <>
    {loading?"Loading":
    <div className='login'>
        <div className="logincontainer">
            <h1>UserName</h1>
            <input onChange={(e)=>updatecred(e)} id='username' placeholder='Username' name='username' type="text" />
            <h1>Password</h1>
            <input onChange={(e)=>updatecred(e)} id='password' placeholder='Password' name='passward' type="text" />
            <button onClick={(e)=>handlelogin(e)}>Submit</button>
            <button onClick={(e)=>handlelogout(e)}>LogOut</button>
        </div>
    </div>
    }
    </>
  )
}

export default Login