import React, { useEffect } from 'react'
import "./Panel.css"
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import { useState,useContext } from "react";

function Panel(props) {

  const [disdate, setdisdate] = useState(false)

  return (
    <div className="panel">
      <div className="panelcontainer">
        <div className="panelcontrol">
          <span className='search'>Search</span>
          <span className='title1'>Destination</span>
          <input onChange={(e)=>{props.props.setdestination(e.target.value)}} placeholder={props.props.destination} className="panelinput"type="text" />
          <span className='title1'>Check in date</span>
          <span onClick={()=>{setdisdate(!disdate)}} className='check panelinput'>{`From  ${format ( props.props.date[0].startDate, 'dd/MM/yy')}  To  ${format ( props.props.date[0].endDate, 'dd/MM/yy')}`}</span>
          {disdate && <div className="date">
            <DateRange className='daterange-hotel'
            editableDateInputs={true}
            minDate={new Date()}
            onChange={item => props.props.setdate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={props.props.date}
            />
          </div>}
          <div className="options">
          <span className='title1'>Options</span>
            <div className="option">
              <span className='title2'>Min price per Night</span>
              <input min={0} onChange={(e)=>(props.props.setmin(e.target.value))} placeholder='0' type="text" />
            </div>
            <div className="option">
              <span className='title2'>Max price per Night</span>
              <input min={0} onChange={(e)=>(props.props.setmax(e.target.value))} placeholder='2000' type="text" />
            </div>
            <div className="option">
              <span className='title2'>Adult</span>
              <input min={1} onChange={(e)=>(props.props.setpeople(prevData => ({ ...prevData, adult: e.target.value })))} placeholder={props.props.people.adult} type="number" />
            </div>
            <div className="option">
              <span className='title2'>Children</span>
              <input min={0} onChange={(e)=>(props.props.setpeople(prevData => ({ ...prevData, children: e.target.value })))} placeholder={props.props.people.children} type="number" />
            </div>
            <div className="option">
              <span className='title2'>Room</span>
              <input min={1} onChange={(e)=>(props.props.setpeople(prevData => ({ ...prevData, room: e.target.value })))} placeholder={props.props.people.room} type="number" />
            </div>
          </div>
          <button onClick={()=>{console.log(props.props.refetchdata())}} className='searchpanel'>Search</button>

        </div>
      </div>
    </div>
  )
}

export default Panel