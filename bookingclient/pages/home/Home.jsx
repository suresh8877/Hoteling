import Header from "../../src/components/Header.jsx";
import Navbar from "../../src/components/navbar.jsx";
import Cities from "./cities.jsx";
import Featured from "./featured.jsx";
import Byprices from "./byprices.jsx";
import React from 'react'
import Email from "./email.jsx";
import Footer from "../../src/components/Footer.jsx";



function Home() {
  return (
    <>
        <Navbar/>
        <Header list="notlist"/>
        <div className="hotelcontainer">
            <h1 style={{width:"85%",margin:"auto",paddingTop:"50px"}}>Trending destinations :</h1>
            <Cities/>
            <h1 style={{width:"85%",margin:"auto"}}>Browse by property type :</h1>
            <Featured/>
            <h1 style={{width:"85%",margin:"auto"}}>Homes guests love :</h1>
            <Byprices/>
            <Email/>
        </div>
        <Footer/>
    </>
  )
}

export default Home