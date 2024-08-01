import React,{useEffect,useState} from 'react'
import "./dashboard.css"
import axios from 'axios'

function Dashboard() {
    const [numusers, setnumusers] = useState(0)
    const [numhotels, setnumhotels] = useState(0)
    const [numrooms, setnumrooms] = useState(0)
    const [profit, setprofit] = useState(0)

    
    useEffect(() => {
        const numberofuser=async ()=>{
            try{
                const countusers=await axios.get("http://localhost:8080/api/user/countofuser");
                const counthotels=await axios.get("http://localhost:8080/api/hotel/countofhotel");
                const countrooms=await axios.get("http://localhost:8080/api/room/countofroom");
                const countprofit=await axios.get("http://localhost:8080/api/room/totalprofit");
                setprofit(countprofit.data.reduce((a,b)=> { return a + b; }, 0));
                setnumusers(countusers.data);
                setnumhotels(counthotels.data);
                setnumrooms(countrooms.data);

            }
            catch(err){
                console.log(err);
            }
        }
        numberofuser()
      
    }, [])
    
  
    return (
    <>
    <div className="dashboard">
        <div className="dashboardcontainer">
            <div className="userinfo">
                <div className="head1">USERS</div>
                <div className="head2">{numusers}</div>
                <div className="head3">The number of active user on <br /> Hoteling Booking</div>
            </div>
            <div className="userinfo">
                <div className="head1">Profit</div>
                <div className="head2">{profit} &#8377;</div>
                <div className="head3">The total amount of profit <br />earn by all hotels</div>
            </div>
            <div className="userinfo">
                <div className="head1">Hotels</div>
                <div className="head2">{numhotels}</div>
                <div className="head3">Total hotels available for<br /> Hoteling Booking</div>
            </div>
            <div className="userinfo">
                <div className="head1">Rooms</div>
                <div className="head2">{numrooms}</div>
                <div className="head3">Total rooms serving spaces by<br /> Hoteling Booking</div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Dashboard