import React from 'react'
import Navbar from '../../src/components/navbar'
import Header from '../../src/components/Header.jsx'
import Hotelspecs from './hotelspecs'
import Email from '../home/email'
import Footer from '../../src/components/Footer'
import { useLocation } from 'react-router-dom'


function Hoteldetail() {

const location=useLocation()
const id=location.pathname.split('/')[2];

return (
    <>
        <Navbar/>
        <Header list="list"/>
        <Hotelspecs props={{"id":id}}/>
        <Email/>
        <Footer/>
    </>
  )
}

export default Hoteldetail