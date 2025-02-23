const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    img: {
        type: String,
      },
    country: {
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    city:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isadmin:{
        type:Boolean,
        default:false
    }
},
    {timestamps:true}
)

module.exports=mongoose.model("user",userSchema)