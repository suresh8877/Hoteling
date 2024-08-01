const User=require("../schemas/userschema.js")
const errorfunc=require("../utils/error.js");


//Update Entry
const updateUser= async (req,res,next)=>{
    try{
        const user= await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(201).json(user);
        console.log("Updated successfully");
    }
    catch(err){
        next(err);
    }
}
//Get ALL Hotels
const getUsers= async (req,res,next)=>{
    try{
        const user= await User.find({});
        res.status(200).json(user);
    }
    catch(err){
        next(err);
    }
}
//Get a User
const getUser= async (req,res,next)=>{
    try{
        const user= await User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch(err){
        next(err);
    }
}
//Delete a User
const deleteUser= async (req,res,next)=>{
    try{
        const user= await User.findByIdAndDelete(req.params.id);
        res.status(200).json(user);
        console.log("DELETED SUCCESFULLY");
    }
    catch(err){
        next(err);
        console.log("Insise catch");

    }
}
const countofuser=async(req,res,next)=>{
    try{
        const number=await User.countDocuments();
        res.status(200).json(number);
    }
    catch(err){
        next(err);
    }
}

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    countofuser
}
