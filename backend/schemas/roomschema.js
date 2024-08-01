const mongoose=require("mongoose")

const roomschema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    numperson:{
        type:Number,
        required:true
    },
    availabilityroom:[{num:{type:Number},unavailable:{type:[Date]}}]
})

module.exports=mongoose.model("room",roomschema);