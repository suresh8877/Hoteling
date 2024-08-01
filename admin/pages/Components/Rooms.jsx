import React ,{useState}from 'react'
import "./room.css"
import Fetch from '../../utils/Fetch'
import axios from 'axios';

function Rooms() {
    const {data,loading,error,refetch}=Fetch("http://localhost:8080/api/room","GET");
    const hotellist=Fetch("http://localhost:8080/api/hotel","GET").data;

    const [bodyroom, setbodyroom] = useState({
        title:"",
        price:0,
        desc:"",
        numperson:0,
    })
    const updatebody=(e)=>{
        setbodyroom((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
        console.log(bodyroom)
    }
    const [disroom, setdisroom] = useState(false)
    const [hotelid, sethotelid] = useState("")
    const submithandle=async ()=>{
        try{
            await axios.post(`http://localhost:8080/api/room/${hotelid}`,bodyroom,{withCredentials: true})
            setdisroom(false);
            refetch()
        }
        catch(err){
            console.log(err);
        }
    }
    const deletehandle=async (e)=>{
        console.log(e.target.id)
        try{
            await axios.delete(`http://localhost:8080/api/room/${e.target.id}`,{withCredentials: true})
            refetch()
        }
        catch(err){
            console.log(err);
        }    
    }
  return (
    <>
        <div className="rooms">
            <div className="roomsconatiner">
                <div className="roomheader">
                    <div>Rooms</div>
                    <button onClick={()=>{setdisroom(!disroom)}}>ADD ROOM</button>
                </div>
                {disroom && <div className="addroom">
                    <div className="addroomconatiner">
                        <div className="optionheader">
                            <div>Room</div>
                            <img onClick={()=>{setdisroom(!disroom)}} src="../../src/assets/x.svg" alt="" />
                        </div>
                        <div className="itemoption">
                            <label htmlFor="title">Title:</label>
                            <input onChange={(e)=>{updatebody(e)}}name="title" type="text" />
                        </div>
                        <div className="itemoption">
                            <label htmlFor="price">Price per day:</label>
                            <input onChange={(e)=>{updatebody(e)}}name="price" type="text" />
                        </div>
                        <div className="itemoption">
                            <label htmlFor="desc">Description:</label>
                            <input onChange={(e)=>{updatebody(e)}}name="desc" type="text" />
                        </div>
                        <div className="itemoption">
                            <label htmlFor="hotel">Select Hotel:</label>
                            <select name="hotel">
                                {hotellist &&
                                    hotellist.map((hotel)=>{
                                        return <option onClick={()=>{sethotelid(hotel._id)}} value="option1">{hotel.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="itemoption">
                            <label htmlFor="numperson">Capacity of people:</label>
                            <input onChange={(e)=>{updatebody(e)}}name="numperson" type="text" />
                        </div>
                        <button onClick={()=>{submithandle()}}>ADD ROOM</button>
                    </div>
                </div>}
            <div className="roomlister">
                <div className="roomlistitem">
                    <div>Title</div>
                    <div>Price per night</div>
                    <div>Capacity of people</div>
                    <span>Options</span>
                </div>
                {loading?"Loading...":
                data.map((room)=>{
                    return(
                        <div key={room._id} className="roomlistitem">
                            <div>{room.title}</div>
                            <div>{room.price}</div>
                            <div>{room.numperson}</div>
                            {/* use in hotel <button id={room._id} onClick={(e)=>{deletehandle(e)}}>DELETE</button> */}
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

export default Rooms