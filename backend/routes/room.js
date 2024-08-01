const express=require("express");
const room=require("../controllers/roomcontrol.js")
const router=express.Router();

router.post("/:Hotelid",room.createRoom);

router.get("/",room.getRooms);

router.get("/countofroom",room.countofroom);

router.get("/totalprofit",room.totalprofit);

router.get("/:id",room.getRoom);

router.put("/:id",room.updateRoom);

router.put("/pushroom/:roomid",room.pushRoom);

router.put("/availabilityroom/:id",room.updateReserveRoom);

router.delete("/:id",room.deleteRoom);


router.delete("/:Hotelid/:roomid",room.deleteHotelRoom);


module.exports=router


