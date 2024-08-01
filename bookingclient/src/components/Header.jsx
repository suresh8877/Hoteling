import {React,useState,useContext }from 'react'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import "./header.css"
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../utils/SearchContext.jsx';



function Header(list) {
    const [disdate, setdisdate] = useState(false)
    const [dispeop, setpeop] = useState(false)
    const [destination, setdestination] = useState("")
    
    const [dispeople, setdispeople] = useState(
        {
            adult:1,
            children:0,
            room:1
        }
    )
    const [date, setdate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
    ]);
   
    const navigate=useNavigate();

    const changepeople=(sign,name)=>{
        setdispeople(prev=>({
                ...prev,
                [name]:sign==="i"?prev[name]+1:prev[name]-1
        }))
    }

    const { dispatch } = useContext(SearchContext);

    const search=()=>{
      
        dispatch({ type: "NEW_SEARCH", payload: { destination, date, dispeople } });
        navigate("/hotel",{state:{destination,date,dispeople}})
    }


  return (<>
        <div className={list.list==="list"?"headerlist":"header"}>
            <div className="headeroptions">
                <div className="headeroptions1">
                    <div className="option1 active">
                        <img src="../src/assets/svgs/bed.svg" alt="bed"/>
                        <span>Stays</span>
                    </div>
                    <div className="option1">
                        <img src="../src/assets/svgs/flight.svg" alt="flight"/>
                        <span>Flights</span>
                    </div>
                    <div className="option1">
                        <img src="../src/assets/svgs/flighthotel.svg" alt="flight"/>
                        <span>Flights+Hotels</span>
                    </div>
                    <div className="option1">
                        <img src="../src/assets/svgs/food.svg" alt="flight"/>
                        <span>Foods</span>
                    </div>
                    <div className="option1">
                        <img src="../src/assets/svgs/carrental.svg" alt="flight"/>
                        <span>Car Rental</span>
                    </div>
                    <div className="option1">
                        <img src="../src/assets/svgs/attraction.svg" alt="flight"/>
                        <span>Attractions</span>
                    </div>
                </div>
            </div>
        
        {list.list==="list"?"":(<>
            <div className="heading">
                <div className="head">
                    <div className="heading1">
                        <span>Find your next stay</span>
                    </div>
                    <div className="heading2">
                        <span>Search deals on hotels, homes, and much more...</span>
                    </div>
                </div>
            </div>
            
            <div className="details">
                <div className="detailcontainer">
                    <div className="detaillayout">
                        <div className="searchdetail">
                            <img src="./src/assets/svgs/bed2.svg" alt="bed" />
                            <input onChange={(e)=>setdestination(e.target.value)} type="text" placeholder='Where are you going?' name="" id="" />
                        </div>
                        <div className="searchdetail">
                            <img src="./src/assets/svgs/calender.svg" alt="bed" />
                            <span onClick={()=>{setdisdate(!disdate)}}>{`From  ${format ( date[0].startDate, 'dd/MM/yy')}  To  ${format ( date[0].endDate, 'dd/MM/yy')}`}</span>
                            {disdate && <DateRange className='daterange'
                            editableDateInputs={true}
                            minDate={new Date()}
                            onChange={item => setdate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            />}
                        </div>
                        <div className="searchdetail">
                            <img src="./src/assets/svgs/people.svg" alt="bed" />
                            <span onClick={()=>setpeop(!dispeop)}>{`${dispeople.adult}-Adult ${dispeople.children}-Children ${dispeople.room}-Room`}</span>
                            {dispeop && <div className="peopledetail">
                            <div className="people">
                                <div className="adultperson">
                                    <span>Adult</span>
                                    <div className="btnpeople">
                                        <button disabled={dispeople.adult<=1} onClick={()=>{changepeople("d","adult")}}>-</button>
                                        <span>{dispeople.adult}</span>
                                        <button onClick={()=>{changepeople("i","adult")}}>+</button>
                                    </div>    
                                </div>
                                <div className="adultperson">
                                    <span>Children</span>
                                    <div className="btnpeople">
                                        <button disabled={dispeople.children<=0} onClick={()=>{changepeople("d","children")}}>-</button>
                                        <span>{dispeople.children}</span>
                                        <button onClick={()=>{changepeople("i","children")}}>+</button>
                                    </div>    
                                </div>
                                <div className="adultperson">
                                    <span>Room</span>
                                    <div className="btnpeople">
                                        <button disabled={dispeople.room<=1} onClick={()=>{changepeople("d","room")}}>-</button>
                                        <span>{dispeople.room}</span>
                                        <button onClick={()=>{changepeople("i","room")}}>+</button>
                                    </div>    
                                </div>
                            </div>                    
                        </div>
                        }
                        </div>
                        <button onClick={()=>{search()}} className='btndetail'>Search</button>
                    </div>
                </div>
            </div>
            </>
        )}
        </div>
    </>
  )
}

export default Header