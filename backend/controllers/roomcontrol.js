const Room=require("../schemas/roomschema.js")
const Hotel=require("../schemas/hotelschema.js")


const createRoom=async (req,res,next)=>{
    const hotelid=req.params.Hotelid;;
    const room=new Room(req.body);
    try{
        const newroom=await room.save();
        try{
            await Hotel.findByIdAndUpdate(hotelid,{$push:{room:newroom._id}});
        }
        catch(err){next(err);}
        res.status(200).send(newroom);
    }    
    catch(err){
        next(err);
    }
}

const deleteHotelRoom=async (req,res,next)=>{
    const hotelid=req.params.Hotelid;
    try{
        await Hotel.findByIdAndDelete(hotelid,{$pull:{room:req.params.roomid}});
        res.status(200).send("DELETED");
    }    
    catch(err){
        next(err);
    }
}

const updateRoom= async (req,res,next)=>{
    try{
        const room= await Room.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(201).json(room);
        console.log("Updated successfully");
    }
    catch(err){
        next(err);
    }
}
//Get ALL Rooms
const getRooms= async (req,res,next)=>{
    try{
        const room= await Room.find({});
        res.status(200).json(room);
    }
    catch(err){
        next(err);
    }
}
//Get a Room
const getRoom= async (req,res,next)=>{
    try{
        const room= await Room.findById(req.params.id);
        res.status(200).json(room);
    }
    catch(err){
        next(err);
    }
}
const deleteRoom= async (req,res,next)=>{
    try{
        const room= await Room.findByIdAndDelete(req.params.id);
        res.status(200).json(room);
        console.log("DELETED SUCCESFULLY");
    }
    catch(err){
        next(err);
    }
}

const updateReserveRoom=async (req,res,next)=>{

    try{
        await Room.updateOne(
            {"availabilityroom._id":req.params.id},
            {
                $push:{
                    "availabilityroom.$.unavailable":req.body.dates
                }
            }
        )
        res.status(200).send("OK RESERVATION DONE ROOM");
    }
    catch(err){
        next(err)
    }
}
const countofroom=async(req,res,next)=>{
    try{
        const count=await Room.countDocuments()
        res.status(200).json(count)
    }
    catch(err){
        next(err)
    }
}

const totalprofit=async(req,res,next)=>{
    try{
        const unav=await Room.find({}, {availabilityroom: 1,price:1})
        const ava=(unav.map((idx)=>{
            return idx.availabilityroom
        }))
        const axa=ava.map((idx)=>{
            const x=idx.map((is)=>{
                return is.unavailable;
            })
            return x;
        })
        const num=axa.map((arra)=>{
            const y=arra.map((u)=>{
                return u.length;
            })
            return y.reduce((a,b)=> { return a + b; }, 0);
        })
        const prices=unav.map((pri,ind)=>{
            return pri.price*num[ind]
        })
        res.status(200).json(prices)
    }  
    catch(err){
        console.log(err)
    }
}
const pushRoom=async (req,res,next)=>{
    console.log(req.body.availabilityroom[0])

    try{
        await Room.findByIdAndUpdate(
            req.params.roomid,
            {
                $push:{
                    "availabilityroom":req.body.availabilityroom[0]
                }
            }
        )
        res.status(200).send("Room added");
    }
    catch(err){
        next(err)
    }
}

module.exports={
    createRoom,
    deleteHotelRoom,
    deleteRoom,
    getRoom,updateReserveRoom,countofroom,totalprofit,pushRoom,
    getRooms,
    updateRoom
}