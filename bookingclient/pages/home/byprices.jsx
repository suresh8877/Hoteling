import "./byprices.css"
import {React,useState} from 'react'
import { useNavigate } from "react-router-dom";
import Fetch from "../../utils/fetch";


function byprices() {
    const navigate=useNavigate();
    const {data,loading,error}=Fetch("http://localhost:8080/api/hotel/findbyname?name=Leamington Hotel,Hyatt Regency London,Harbor Haven,Opportunity Resortt")
    
    const hotelbypricehandle=(e,id)=>{
        navigate(`/hoteldetail/${id}`);
    }
  return (
    <>
    <div className="byprices">
        <div  className="bypricescontainer">
            {loading?"loading":
                data.map((hotel)=>{
                    return(
                        <div key={hotel[0]._id} onClick={(e)=>hotelbypricehandle(e,hotel[0]._id)} className="bypricescard">
                            <img src={hotel[0]?.photos[0]} alt="" />
                            <span className="bypricename">{hotel[0].name}</span>
                            <span className="bypricecity">{hotel[0].city}</span>
                            <div className="bypricesrating">
                                <button>{hotel[0].rating}</button>
                                <span>Excellent</span>
                            </div>
                            <span className="bypricestarting">Starting from <b>{hotel[0].price}</b></span>
                        </div>
                    )
                })
            }
        </div>
    </div>
    </>
  )
}

export default byprices