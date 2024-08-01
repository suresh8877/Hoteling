const mongoose=require("mongoose");

const hotelschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    title:{
        type: String,
        required: true,
    },
    distance:{
        type:Number
    },
    address: {
        type: String,
        required: true,
    },
    city:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        min:0,
        max:5
    },
    photos:{
        type:[String]
    },
    room:{
        type:[String]
    },
    featured:{
        type:Boolean,
        default:false
    }
    },
    {timestamps:true}
)
module.exports=mongoose.model("hotel",hotelschema)