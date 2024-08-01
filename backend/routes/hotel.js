const hotelcontrol=require("../controllers/hotelcontrol.js");
const express=require("express")
const router=express.Router()
const verify=require("../utils/verifiying.js");


router.post("/",verify.verifyAdmin,hotelcontrol.createHotel);

router.post("/photos",verify.verifyAdmin,hotelcontrol.photoadder);

router.get("/",hotelcontrol.getHotels);

router.get("/find",hotelcontrol.LTNhotels);

router.get("/findbyname",hotelcontrol.findbyname);

router.get("/findbylist",hotelcontrol.getHotelList);

router.get("/countbytype",hotelcontrol.countbyType);

router.get("/countofhotel",hotelcontrol.countofhotel);

router.get("/:id",hotelcontrol.getHotel);

router.put("/:id",verify.verifyAdmin,hotelcontrol.updateHotel);

router.delete("/:id",verify.verifyAdmin,hotelcontrol.deleteHotel);

router.get("/room/:hotelid",hotelcontrol.getroomsfromhotel)

module.exports=router