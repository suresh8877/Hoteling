import { set } from "date-fns";
import "./hotelspec.css"
import Fetch from '../../utils/fetch'
import {useNavigate} from "react-router-dom"
import React, { useEffect, useState,useContext } from 'react'
import {SearchContext} from "../../utils/SearchContext.jsx"
import {AuthContext} from "../../utils/AuthContext.jsx"
import Reserve from "./Reserve.jsx";

function Hotelspecs(props) {
    const [disreserve, setdisreserve] = useState(false)
    const {user}=useContext(AuthContext);
    const navigate=useNavigate();
    const reserveHandle=()=>{
        if(user){
            setdisreserve(!disreserve)
        }
        else{
            navigate("/Login")
        }
    }


    const {data,loading,error}=Fetch(`http://localhost:8080/api/hotel/${props.props.id}`);
  
    const hotels = [
        { src: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/a7/e5/29/jw-marriott-mumbai-sahar.jpg?w=1200&h=-1&s=1' },
        { src: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/a7/e5/0d/jw-marriott-mumbai-sahar.jpg?w=1100&h=-1&s=1' },
        { src: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/65/0b/2f/jw-marriott-hotel-mumbai.jpg?w=1100&h=-1&s=1' },
        { src: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/65/0b/81/jw-marriott-hotel-mumbai.jpg?w=1100&h=-1&s=1' },
        { src: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/65/0b/5b/jw-marriott-hotel-mumbai.jpg?w=1100&h=-1&s=1' },
        { src: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/11/74/18/jw-marriott-mumbai-sahar.jpg?w=1200&h=-1&s=1' },
        { src: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/65/0b/69/jw-marriott-hotel-mumbai.jpg?w=1100&h=-1&s=1' },
        { src: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/65/0b/81/jw-marriott-hotel-mumbai.jpg?w=1100&h=-1&s=1' },
        { src: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/65/0b/5b/jw-marriott-hotel-mumbai.jpg?w=1100&h=-1&s=1' },
        { src: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/11/74/18/jw-marriott-mumbai-sahar.jpg?w=1200&h=-1&s=1' },
        { src: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/65/0b/69/jw-marriott-hotel-mumbai.jpg?w=1100&h=-1&s=1' },
        { src: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/65/0b/81/jw-marriott-hotel-mumbai.jpg?w=1100&h=-1&s=1' },
        { src: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/65/0b/5b/jw-marriott-hotel-mumbai.jpg?w=1100&h=-1&s=1' },
        { src: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/11/74/18/jw-marriott-mumbai-sahar.jpg?w=1200&h=-1&s=1' },
        { src: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/65/0b/69/jw-marriott-hotel-mumbai.jpg?w=1100&h=-1&s=1' },
        { src: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/11/74/18/jw-marriott-mumbai-sahar.jpg?w=1200&h=-1&s=1' },
        { src: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/11/74/18/jw-marriott-mumbai-sahar.jpg?w=1200&h=-1&s=1' },        
    ];

    const [dispic, setdispic] = useState(false)
    const [pic, setpic] = useState(0)
    useEffect(() => {
        if(pic>16){
            setpic(0);
        }
    }, [pic])
    
    const displayhandle=(i)=>{
        setpic(i)
        setdispic(true)
    }
    const handlearrow=(operation)=>{
        if(operation=="r"){
            pic==hotels.length-1?setpic(0):setpic(i=>i+1);
        }
        else{
            pic==0?setpic(hotels.length-1):setpic(i=>i-1);
        }
    }

    const {date} = useContext(SearchContext)
    const MILLISECOND_PERDAY=24*60*60*1000;
    function daydiff(date1,date2){
        const timediff=Math.abs(date2.getTime()-date1.getTime())
        const diffday=Math.ceil(timediff/MILLISECOND_PERDAY)
        return diffday;
    }
    const daydiffrence=daydiff(date[0].startDate,date[0].endDate)
    
    return (
        <>
        {dispic && <div className="displaypic">
            <div className="disimg">
                <div onClick={()=>(handlearrow("l"))} className="disimgleft">{"<"}</div>
                <img className="img-3" src={hotels[pic].src} alt="" />
                <div onClick={()=>(handlearrow("r"))} className="disimgleft"><img onClick={()=>setdispic(false)} height={60} className="disimgX" src="../../src/assets/svgs2/x.svg" alt="" />{">"}</div>
                
            </div>
        </div>}

        <div className="hotelspecs">
            <div className="specs">
                <div className="specdetail">
                    <span className="spectitle">{data.name}</span>
                    <div className="specloco">
                        <img className="img-1" src="../src/assets/svgs2/location.svg" alt="" />
                        <span>{data.city}</span>
                    </div>
                    <span className="spectitle1">{data.address}</span>
                    <span className="spectitle2">Book a stay and get free taxi from airport.</span>
                    <button onClick={()=>(reserveHandle())} className="reservebtn reservebtnpos">Reserve Or Book Now!</button>
                </div>

                <div className="specimg">
                    {hotels.map((item,i)=>{
                        return <img className="img-2" onClick={(()=>displayhandle(i))} key={i} src={item.src} alt="" />
                    })
                    }
                </div>
                <div className="specdetail2">
                    <div className="specinfo">
                        <span>Mountain Crest Lodge in Aspen Valley, Colorado, USA, offers cozy accommodations with scenic mountain views and outdoor activities like hiking and skiing.</span>
                        <p>{data.desc}</p>
                    </div>
                    <div className="specprice">
                        <div className="specpricecontainer">
                            <span className="specprice1">Perfect for {(daydiffrence||1)} nights</span>
                            <p>Mountain Crest Lodge is rated 4 stars for its cozy accommodations, scenic mountain views, and excellent service with rating 8.8</p>
                            <span className="specpricevalue"><b>{data.price*(daydiffrence||1)}</b> {(daydiffrence||1)} nights</span>
                            <button onClick={()=>(reserveHandle())} className="reservebtn">Reserve Or Book Now!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {disreserve && <Reserve hotelid={props.props.id} setdisreserve={setdisreserve}/>}
    </>
  )
}

export default Hotelspecs