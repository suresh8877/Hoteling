import React,{useEffect,useState} from 'react'
import axios from "axios"
import "./user.css"
import Fetch from '../../utils/Fetch'

function Users() {

  const {data,loading,error,refetch}=Fetch("http://localhost:8080/api/user","GET");
  console.log(error)
  const [disadd, setdisadd] = useState(false)
  const [adduser, setadduser] = useState({
    name: '',
    username: '',
    email: '',
    img: '',
    country: '',
    phone: '',
    city: '',
    password: '',
  })

  const adduserhandle=(e)=>{
    setadduser((prev)=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
    console.log(adduser)
  }
  const adduser2handle=async ()=>{
    try{
      await axios.post(`http://localhost:8080/api/register`,adduser,{withCredentials: true})
      refetch()
    }
    catch(err){
      console.log(err);
    }
    setadduser(!adduser)
  }

  const handledelete=async (e)=>{
    try{
      await axios.delete(`http://localhost:8080/api/user/${e.target.id}`,{withCredentials: true})
      refetch()
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <>
    <div className="user">
        <div className="usercontainer">
          <div className="addhead">
            <h2>Users</h2>
            <button className='addbtnuser' onClick={()=>{setdisadd(!disadd)}}>ADD USER</button>
            {disadd && <div className="addusercontainer">
              <div className="adduserform">
              <button className="closeadduser" onClick={()=>{setdisadd(!disadd)}}><img src="../../src/assets/x.svg"></img></button>
              <div>Name</div>
              <input onChange={(e)=>adduserhandle(e)} type="text" name="name" />
              <div>Username</div>
              <input onChange={(e)=>adduserhandle(e)} type="text" name="username" />
              <div>Email</div>
              <input onChange={(e)=>adduserhandle(e)} type="text" name="email" />
              <div>Profile Pic</div>
              <input onChange={(e)=>adduserhandle(e)} type="text" name="img" />
              <div>Country</div>
              <input onChange={(e)=>adduserhandle(e)} type="text" name="country" />
              <div>City</div>
              <input onChange={(e)=>adduserhandle(e)} type="text" name="city" />
              <div>Phone</div>
              <input onChange={(e)=>adduserhandle(e)} type="text" name="phone" />
              <div>Password</div>
              <input onChange={(e)=>adduserhandle(e)} type="text" name="password" />
              <button className='subbtn' onClick={()=>adduser2handle()}>SUBMIT</button>
            </div>
            </div>
            }
          </div>

            <div className="userlist">
            {loading?"Loading..":data.map((user)=>{
                return(<div key={user._id} className="user1">
                    {user.img?<img src={user.img} alt="user" />:<img src="data:image/png;base64,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" alt="user" />}
                    <div className="userhead1">{user.name}</div>
                    <div className="userhead2">{user.email}</div>
                    <div className="userhead3">{user.phone}</div>
                    <div className="usercity">{user.city}</div>
                    {user.isadmin?"IS ADMIN" :<button onClick={(e)=>handledelete(e)} id={user._id} className="userdelete">DELETE</button>}
                  </div>
                )
              })
            }
            </div>
        </div>
    </div>
    </>
  )
}

export default Users