import React from 'react'
import "./email.css"


function email() {
  
  return (
    <>
        <div className="email">
            <div className="emailcontainer">
                <span className='emailhead'>Save Money and Time!</span>
                <span style={{fontSize:"20px",color:"white"}}>Share your mail to know interesting deals</span>

                <div className="btnemail">
                    <input placeholder='Let us Know..' className="emailinput" type="text" />
                    <button className='btn'>Subscribe</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default email