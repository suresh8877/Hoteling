const User=require("../schemas/userschema.js")
const errorfunc=require("../utils/error.js");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


const register=async (req,res,next)=>{
    console.log(req.body);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    try{
        const user=new User({
            ...req.body,
            password:hash,
        })
        await user.save();
        res.status(201).json(user);
    }
    catch(err){
        next(err);
    }
}

const login=async (req,res,next)=>{

    try{
        const user=await User.findOne({username:req.body.username});
        if(!user) return next(errorfunc(400,"User not found"))

        const ispass= bcrypt.compareSync(req.body.password, user.password); 
        if(!ispass) return next(errorfunc(401,"Wrong user or password"))

        const token = jwt.sign({ id:user._id , isadmin:user.isadmin}, 'shhhhh');

        const {password, ...otherdetail}=user._doc
        res
        .cookie("access_name",token,{
            httpOnly:true,
        })
        .status(200)
        .json({...otherdetail});
    }
    catch(err){
        next(err);
    }
}

module.exports={register,login}
