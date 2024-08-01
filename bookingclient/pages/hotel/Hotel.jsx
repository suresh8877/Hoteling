import React, { createContext, useState,useEffect } from 'react'
import Navbar from '../../src/components/navbar'
import Header from '../../src/components/Header'
import Panel from './Panel'
import { useLocation } from 'react-router-dom'
import Hotellist from './Hotellist'
import Email from '../home/email'
import Footer from '../../src/components/Footer'
import Fetch from '../../utils/fetch.jsx'


function Hotel() {
  const location=useLocation();
  const [datad, setdatad] = useState(location.state);
  const [destination, setdestination] = useState(datad.destination)
  const [date, setdate] = useState(datad.date)
  const [people, setpeople] = useState(datad.dispeople)
  const [min,setmin]= useState(100);
  const [max,setmax]= useState(2000);

  const {data,loading,error,refetchdata}=Fetch(`http://localhost:8080/api/hotel/findbylist?city=${destination}&min=${min}&max=${max}`);

  return (
    <>
      <Navbar/>
      <Header list="list"/>
      <div style={{display:"flex"}}>
          <Panel props={{destination, setdestination,date, setdate,people, setpeople,min,setmin,max,setmax,refetchdata}}/>
          <Hotellist props={{data,loading}}/>
      </div>
      <Email/>
      <Footer/>
    </>
  )
}

export default Hotel