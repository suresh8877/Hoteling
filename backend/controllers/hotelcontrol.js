const Hotel=require("../schemas/hotelschema.js")
const Room=require("../schemas/roomschema.js")
const errorfunc=require("../utils/error.js");

//Create Hotel
const createHotel= async (req,res,next)=>{
    console.log(req.body)
    const hotel=new Hotel(req.body);
    console.log(hotel);
    try{
        await hotel.save();
        res.status(200).json(hotel);
        console.log("SAVED");
    }
    catch(err){
        next(errorfunc(401,"Not ADDED"));
    }
}
//Update Entry
const updateHotel= async (req,res,next)=>{
    try{
        const hotel= await Hotel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(201).json(hotel);
        console.log("Updated successfully");
    }
    catch(err){
        next(err);
    }
}
//Get ALL Hotels
const getHotels= async (req,res,next)=>{
    try{
        const hotel= await Hotel.find(req.query);
        res.status(200).json(hotel);
    }
    catch(err){
        next(err);
    }
}
//Get a Hotel
const getHotel= async (req,res,next)=>{
    try{
        const hotel= await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    }
    catch(err){
        next(err);
    }
}
//Delete a Hotel
const deleteHotel= async (req,res,next)=>{
    try{
        const hotel= await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json(hotel);
        console.log("DELETED SUCCESFULLY");
    }
    catch(err){
        next(err);
        console.log("Insise catch");

    }
}

const LTNhotels=async (req,res,next)=>{
    const values=req.query.cities.split(",");
    try{
        const total=await Promise.all(values.map(async (city)=>{
            return Hotel.countDocuments({"city":city})
        }))
        res.status(200).json(total);
    }
    catch(err){
        next(err)
    }
}
const countbyType=async (req,res,next)=>{
    const hotels=await Hotel.countDocuments({"type":"Hotel"})
    const resorts=await Hotel.countDocuments({"type":"Resort"})
    const villas=await Hotel.countDocuments({"type":"Villa"})
    const apartments=await Hotel.countDocuments({"type":"Apartment"})
    const cabins=await Hotel.countDocuments({"type":"Cabin"})
    const total=[hotels,resorts,villas,apartments,cabins]
    try{
        res.status(200).json(total);
    }
    catch(err){
        next(err)
    }
}

const findbyname=async (req,res,next)=>{
    const names=req.query.name.split(',')
    try{
        const hoteldetails=await Promise.all(names.map(async (name)=>{
           return await Hotel.find({"name":name})
        }))
        res.status(200).json(hoteldetails);
    }
    catch(err){
        next(err)
    }
}
const getHotelList= async (req,res,next)=>{
    const {min,max,...other}=req.query
    try{
        const hotel= await Hotel.find({...other,price:{$gte:req.query.min,$lte:req.query.max}});
        res.status(200).json(hotel);
    }
    catch(err){
        next(err);
    }
}

const getroomsfromhotel=async(req,res,next)=>{
    try{
        const hotel= await Hotel.findById(req.params.hotelid);
        const roomlist=hotel.room
        const rooms=await Promise.all(roomlist.map((room)=>{
            return Room.findById(room);
        }))
        res.status(200).json(rooms)
    }
    catch(err){
        next(err)
    }
}

const countofhotel=async(req,res,next)=>{
    try{
        const count=await Hotel.countDocuments()
        res.status(200).json(count)
    }
    catch(err){
        next(err)
    }
}
const photoadder=async(req,res,next)=>{
    try{
        const photo=await Hotel.findByIdAndUpdate(req.body.hotelid,
        { $push: { photos: req.body.photourl } },{new:true})
        res.status(200).json(photo)
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    createHotel,
    getHotel,
    getHotels,
    LTNhotels,findbyname,getHotelList,getroomsfromhotel,countofhotel,photoadder,
    countbyType,
    deleteHotel,
    updateHotel
}
