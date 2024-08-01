import React, { useState } from 'react'
import Fetch from '../../utils/Fetch';
import "./hotels.css"
import axios from 'axios';
import Roomlisthotels from './roomlisthotels';

function Hotels() {
    const { data, loading, error, refetch } = Fetch("http://localhost:8080/api/hotel", "GET");
    
    
    const [disadd, setdisadd] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        type: '',
        title: '',
        distance: '',
        address: '',
        city: '',
        desc: '',
        price: 0,
        rating: 0,
    });

    const handleChange = (e) => {
        const { name, value ,type, checked} = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };
    const deletehandle=async (id)=>{
        try{
            await axios.delete(`http://localhost:8080/api/hotel/${id}`,{withCredentials: true})
            refetch()
        }
        catch(err){
            console.log(err);
        }
    }
    const addhotelhandle=async ()=>{
        try{
            await axios.post("http://localhost:8080/api/hotel/",formData,{withCredentials: true})
            setdisadd(false)
            refetch()
        }
        catch(err){
            console.log(err);
        }
    }
    const [hotelview, sethotelview] = useState(false)
    const [hotelviewdetail, sethotelviewdetail] = useState({})

    const viewhandle=(e,hotel)=>{
        sethotelview(true);
        sethotelviewdetail(hotel);
    }

    const viewedithandle=(e)=>{
        sethotelviewdetail((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
        console.log(hotelviewdetail)
    }
    const updateviewhandle=async(e,hotelid)=>{
        const {room,photos,...oth}=hotelviewdetail;
        try{
            await axios.put(`http://localhost:8080/api/hotel/${hotelid}`,oth,{withCredentials: true})
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <div className="hotels">
                <div className="hotelscontainer">
                    <div className="headers">
                        <div>HOTELS</div>
                        <button onClick={() => { setdisadd(!disadd) }}>ADD HOTELS</button>
                    </div>
                    {disadd && <div className="addhoteloptions">
                        <div className="addoptioncontainer">
                            <div className="addoptionheader">
                                <div>Hotel</div>
                                <img onClick={() => { setdisadd(!disadd) }} src="../../src/assets/x.svg" alt="" />
                            </div>
                            <div className="groupdetail">
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Type:</label>
                                    <input
                                        type="text"
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Title:</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Distance:</label>
                                    <input
                                        type="number"
                                        name="distance"
                                        value={formData.distance}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Address:</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>City:</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description:</label>
                                    <input
                                        type="text"
                                        name="desc"
                                        value={formData.desc}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Price:</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Rating (0-5):</label>
                                    <input
                                        type="number"
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleChange}
                                        min="0"
                                        max="5"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Featured:</label>
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={formData.featured}
                                        onChange={handleChange}
                                    />
                                </div>
                            <button onClick={()=>addhotelhandle()}>SUBMIT</button>
                            </div>
                        </div>
                    </div>}
                    <div className="hotellister">
                        <div className="hotelitem">
                            <div className="hotelhead1 hf-1">Name</div>
                            <div className="hotelhead2 hf-1">CITY</div>
                            <div className="hotelhead5 hf-1">ROOMTYPES</div>
                            <div className="hotelhead3 hf-1">PRICE</div>
                            <div className="hotelhead4 hf-1">RATING</div>
                            <div className="hotelhead4 hf-1 f-2">Action</div>
                        </div>

                        {loading ? "loading" : data.map((hotel) => {
                            return (
                                <div key={hotel._id} className="hotelitem">
                                    <div className="hotelhead1">{hotel.name}</div>
                                    <div className="hotelhead2">{hotel.city}</div>
                                    <div className="hotelhead5">{hotel.room.length}</div>
                                    <div className="hotelhead3">{hotel.price}</div>
                                    <div className="hotelhead4">{hotel.rating}</div>
                                    <div className="f-2">
                                    <button onClick={(e)=>{viewhandle(e,hotel)}}>VIEW</button>                                           
                                    <button onClick={()=>{deletehandle(hotel._id)}}>DELETE</button>
                                    </div>
                                </div>
                            )
                        })
                        }
                        {hotelview && <div className="view">
                            <div className="viewcontainer">
                                <div className="viewheader">
                                    <span>Hotel detail</span>
                                    <img onClick={()=>(sethotelview(false))} src="../../src/assets/x.svg" alt="" />
                                </div>
                                <div className="viewitem">
                                    <label htmlFor="">Name:</label>
                                    <input name="name" onChange={(e)=>{viewedithandle(e)}} value={hotelviewdetail.name} type="text"/>
                                </div>
                                <div className="viewitem">
                                    <label htmlFor="">Distance:</label>
                                    <input name="distance" onChange={(e)=>{viewedithandle(e)}} value={hotelviewdetail.distance} type="text"/>
                                </div>
                                <div className="viewitem">
                                    <label htmlFor="">City</label>
                                    <input name="city" onChange={(e)=>{viewedithandle(e)}} value={hotelviewdetail.city} type="text"/>
                                </div>
                                <div className="viewitem">
                                    <label htmlFor="">Description:</label>
                                    <input name="desc" onChange={(e)=>{viewedithandle(e)}} value={hotelviewdetail.desc} type="text"/>
                                </div>
                                <div className="viewitem">
                                    <label htmlFor="">Price:</label>
                                    <input name="price" onChange={(e)=>{viewedithandle(e)}} value={hotelviewdetail.price} type="text"/>
                                </div>
                                <div className="viewitem">
                                    <label htmlFor="">Rating</label>
                                    <input name="rating" onChange={(e)=>{viewedithandle(e)}} value={hotelviewdetail.rating} type="text"/>
                                </div>
                                <div className="viewitem">
                                    <label htmlFor="">Featured</label>
                                    <input name="featured"  value={hotelviewdetail.featured?"true":"false"} type="text"/>
                                </div>
                                <button onClick={(e)=>{updateviewhandle(e,hotelviewdetail._id)}}>UPDATE</button>
                                <Roomlisthotels props={hotelviewdetail.room} hotelid={hotelviewdetail._id}/>
                            </div>
                        </div>}

                    </div>
                </div>
            </div>

        </>
    )
}


export default Hotels