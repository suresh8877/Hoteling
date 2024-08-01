import React,{useContext, useState} from 'react'
import Fetch from '../../utils/fetch'
import { SearchContext } from '../../utils/SearchContext';
import axios from 'axios';
import "./reserve.css"

function Reserve({hotelid,setdisreserve}) {
    const [selectedroom, setselectedroom] = useState([])
    const {date}=useContext(SearchContext)
    const {data,loading,error}=Fetch(`http://localhost:8080/api/hotel/room/${hotelid}`);
    
    const dateseries=(startdate,enddate)=>{
        const start=new Date(startdate);
        const end=new Date(enddate);
        const date=new Date(start.getTime())
        let datelist=[]
        while(date<=end){
            datelist.push(new Date(date).getTime())
            date.setDate(date.getDate()+1)
        }
        return datelist;
    }
    const datelist=dateseries(date[0].startDate,date[0].endDate);
    const checkavailable=(roomnumber)=>{
        const isfound=roomnumber.unavailable.some((date)=>{
            return datelist.includes(new Date(date).getTime());
        }
    )
        return !isfound;
    }

    const handleselected=(e)=>{
        const checked=e.target.checked;
        setselectedroom(
            checked?
            [...selectedroom,e.target.id]:
            selectedroom.filter((idx)=>e.target.id!=idx)
        )
    }
    const reservemyroom=async ()=>{
        try{
            await Promise.all(selectedroom.map((roomid)=>{
                const res=axios.put(`http://localhost:8080/api/room/availabilityroom/${roomid}`,{dates:datelist})
            }))

        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <>
        <div className="reserve">
            <div className="reservecontainer">
                <div className="reservedetail">
                <div onClick={()=>{setdisreserve(false)}} className='closedwindow'>
                    <img color='black' src="../../src/assets/svgs2/x.svg" alt="" />
                </div>
                    <div className="scroller">
                    {data.map((room)=>{
                        return(
                            <div>
                                <div className="roomdetail">
                                    <div className="rooominfo">
                                        <div className="roomname">{room.title}</div>
                                        <div className="roomdesc">{room.desc}</div>
                                        <div className="roomperson">{room.numpeorson}</div>
                                        <div className="roomprice">{room.price}₹ per day</div>
                                    </div>
                                    <div className="roomnums">
                                        {room.availabilityroom.map((roomnumber)=>{
                                            return (<div className='roomnumsdetail'>
                                                <label  htmlFor="roomnumber.num">{roomnumber.num}</label>
                                                <input disabled={!checkavailable(roomnumber)} onClick={(e)=>(handleselected(e))} type="checkbox" name={roomnumber.num} id={roomnumber._id} />
                                                {!checkavailable(roomnumber)? <span style={{color:"red"}}>Unavailable</span>:<span style={{color:"green"}}>Available</span>}
                                                </div>)
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    </div>
                    <button disabled={selectedroom.length==0 && true} className="myreservebtn" onClick={()=>{reservemyroom()}}>Reserve</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Reserve