import React,{useState,useEffect} from 'react'
import axios from 'axios';

function roomlisthotels(props) {
  const [names, setnames] = useState([])
  const [photourl, setphotourl] = useState("")

  useEffect(() => {
    const fun=async()=>{
      const names=await Promise.all(props.props.map(async (id)=>{
        return await axios.get(`http://localhost:8080/api/room/${id}`,{withCredentials: true})
      }))
      const dataname=names.map((data)=>{
        return data.data;
      })
      setnames(dataname)
      console.log(dataname)
    }
    fun()
  }, [])

  const photohandle=async (e,hotelid)=>{
    try{
      await axios.post("http://localhost:8080/api/hotel/photos",{photourl,hotelid},{withCredentials: true})
    }
    catch(err){
      console.log(err);
    }
  }
  const deleteroom=async (e,id)=>{
    try{
      await axios.delete(`http://localhost:8080/api/room/${id}`,{withCredentials: true})
    }
    catch(err){
      console.log(err);
    }
  }
  const [roomnumber, setroomnumber] = useState(null)
  const [roomdata, setroomdata] = useState({
    "availabilityroom": [
        {
          "unavailable": [],
          "num": roomnumber
        }
    ]
  })
  const addroom=async (e,roomid)=>{
    setroomdata(prevState => ({
      ...prevState,
      availabilityroom: [
        {
          ...prevState.availabilityroom[0],
          num: roomnumber 
        }
      ]
    }));
    try{
      await axios.put(`http://localhost:8080/api/room/pushroom/${roomid}`,roomdata,{withCredentials: true})
    }
    catch(err){
      console.log(err);
    }
  }
            
  return (
      <>
      <h5>Roomtypes</h5>
      <div className="roomlistitemview">
          {names?.map((name)=>{
            return(
              <>
                  <div className="options">
                      <div className='f-1'>{name.title}</div>
                      <div className="actionroomlist f-1">
                        <input onChange={(e)=>{setroomnumber(e.target.value)}} placeholder='RoomNumber' type="text" />
                        <button onClick={(e)=>{addroom(e,name._id)}}>ADD</button>
                        <button onClick={(e)=>{deleteroom(e,name._id)}}>Delete</button>
                      </div>
                  </div>
              </>)
          } )
        }
      </div>
      <div className="photoadder">
        <label htmlFor="photo"><b>Photos:</b></label>
        <input onChange={(e)=>{setphotourl(e.target.value)}}placeholder='Only paste one url and add' type="text" />
        <button onClick={(e)=>{photohandle(e,props.hotelid)}}>ADD</button>
      </div>
      </>
      )
}

export default roomlisthotels