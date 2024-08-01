import React from 'react'
import "./listitem.css"
import { Link } from 'react-router-dom'

function listitem(props) {
    console.log(props.props," li")
    
    return (
    <>
    <div className="listlayout">
        <div className="listcontainer">
            <img src="https://media.istockphoto.com/id/472899538/photo/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab.jpg?s=612x612&w=0&k=20&c=rz-WSe_6gKfkID6EL9yxCdN_UIMkXUBsr67884j-X9o=" alt="" />
            <div className="listinfo">
                <h1>{props.props.name}</h1>
               {props.props.address?<h4>{props.props.address}</h4>:<h4>{props.props._id}</h4>} <h4>{props.props.address}</h4>
                <span className='title3'>Free taxi from airport</span>
                <span className='title4'>Azure Sands Resort is a luxurious beachfront retreat offering breathtaking ocean views.</span>
                <span className='title5'>Spacious accommodations with plush bedding, private balcony or terrace with ocean views, high-speed Wi-Fi.</span>
                <span className='title6'>Free Cancellation</span>
                <span className='title7'>Book now to seal deal</span>
            </div>
            <div className="detailslist">
                <div className="rating">
                    <span>Excellent</span>
                    <button>{props.props.rating}</button>
                </div>
                <div className="listpricing">
                    <span className='pricehead1'>{props.props.price}</span>
                    <span className='pricehead2'>includes taxes and fees</span>
                    <button>
                        <Link to={`/hoteldetail/${props.props._id}`} style={{textDecoration:'none',color:"white"}} >
                            Check Availibity
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default listitem