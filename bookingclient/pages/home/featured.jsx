import React from 'react'
import Fetch from "../../utils/fetch"
import "./featured.css"

function featured() {

    const featurehotellist=[
        {
          "type": "Hotels",
          "imageSrc": "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
          "type": "Resorts",
          "imageSrc": "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&o="
        },
        {
          "type": "Villas",
          "imageSrc": "https://r-xx.bstatic.com/xdata/images/hotel/263x210/100235855.jpeg?k=5b6e6cff16cfd290e953768d63ee15f633b56348238a705c45759aa3a81ba82b&o="
        },
        {
          "type": "Apartments",
          "imageSrc": "https://res.cloudinary.com/essential-living/image/upload/ar_1.756,c_fill,g_auto,w_1088/f_auto/q_auto/v1/Developments/Dressage%20Court/Apartments/2%20Bed/dressage-court-2-bed-n14_2?_a=ATO2BAA0"
        },
        {
          "type": "Cabins",
          "imageSrc": "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o="
        }
      ]

      const {data,loading,error}=Fetch("http://localhost:8080/api/hotel/countbytype")
  return (
    <>
        <div className="featured">
            <div className="featuredcontainer">
                <div className="featuredlayout">
                    {featurehotellist.map((item,i)=>{
                        return<div key={i} className="featuredcard">
                            <img src={item.imageSrc} alt="" />
                            <div className="featurehead">
                                <h2>{item.type}</h2>
                                <h3>{data[i]}</h3>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </>
  )
}

export default featured