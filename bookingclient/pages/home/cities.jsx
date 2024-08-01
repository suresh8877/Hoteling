import React from 'react'
import "./city.css"
import Fetch from '../../utils/fetch'


function cities() {

    const {data,loading,err}=Fetch("http://localhost:8080/api/hotel/find?cities=Tokyo,London,NewYork");

    return (
    <>
        <div className="citycontainer">
            <div className="cities">
                <div className="citycard">
                    <img src="https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
                    <div className='cityheads'>
                        <h1>TOKYO</h1>
                        <h2>{data[0]} properties</h2>
                    </div>
                </div>
                <div className="citycard">
                    <img src="https://wanderlustcrew.com/wp-content/uploads/2023/02/Most-Beautiful-Places-in-Switzerland-1100x733.jpeg" alt="" />
                    <div className='cityheads'>
                        <h1>LONDON</h1>
                        <h2>{data[1]} properties</h2>
                    </div>
                </div>
                <div className="citycard">
                    <img src="https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    <div className='cityheads'>
                        <h1>NEW YORK</h1>
                        <h2>{data[2]} properties</h2>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default cities