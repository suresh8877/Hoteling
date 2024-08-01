import React,{useState,useRef,useEffect,useContext} from 'react'
import Dashboard from './Dashboard'
import "./Panel.css"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext.jsx';
import Users from './Users'
import Hotels from './Hotels'
import Rooms from './Rooms'

function Panelleft() {
    const [diswindow, setdiswindow] = useState(<Dashboard/>)

    const buttonRef = useRef(null);

    useEffect(() => {
        buttonRef.current.focus();
    }, []);

    const {user,loading,error,dispatch}=useContext(AuthContext);
    const navigate=useNavigate()
    const handlelogout=async (e)=>{
        e.preventDefault()
        try{
            dispatch({type:"LOG_OUT"})
            navigate("/");
        }
        catch(err){
            console.log(err)
        }
    }


  return (
    <>
    <div className="panel">
        <div className="leftpanelcontainer">
            <div className="main">
                <h5>Main</h5>
                <button onClick={()=>{setdiswindow(<Dashboard/>)}}  ref={buttonRef} className='activebtn'>Dashboard</button>
            </div>
            <div className="lists">
                <h5>List</h5>
                <button onClick={()=>{setdiswindow(<Users/>)}} className='activebtn'>Users</button>
                <button onClick={()=>{setdiswindow(<Hotels/>)}} className='activebtn'>Hotels</button>
                <button onClick={()=>{setdiswindow(<Rooms/>)}} className='activebtn'>Rooms</button>
            </div>
            <div className="adminlist">
                <h5>Admin</h5>
                <button className='activebtn'>Profile</button>
                <button onClick={(e)=>(handlelogout(e))} className='activebtn'>Logout</button>
            </div>
        </div>
        <div className="rightpanelcontainer">
            {diswindow}
        </div>
    </div>
    </>
  )
}

export default Panelleft