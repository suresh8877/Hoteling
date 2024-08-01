const express=require("express")
const app=express();
const hotel=require("./routes/hotel")
const auth=require("./routes/auth")
const user=require("./routes/user")
const room=require("./routes/room")
const cors=require("cors");

app.use(cors({
    origin: ['http://localhost:5173','http://localhost:5174'],
    credentials: true
  }))

const cookieParser = require("cookie-parser");

const mongoose=require("mongoose");

const connect= async ()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/BOOKINGAPP")
        console.log("Connected to DB")
    }
    catch(err){
        console.log(err);
    }
} 
mongoose.connection.on("disconnected",()=>console.log("DB disconnected"));


app.use(express.json())
app.use(cookieParser())

app.use('/api/hotel',hotel)
app.use('/api/register',auth)
app.use('/api/user',user)
app.use('/api/room',room)

app.use((err,req,res,next)=>{
    res.status(err.status).json({"status":err.status,"message":err.message,"stack":err.stack});
    res.end();
})






app.get("/",(req,res)=>{
    res.send("hello");
    console.log(req.body);
    res.end();
})
app.listen(8080,()=>{
    connect();
    console.log("Lisening on 8080",'http://localhost:8080');
})