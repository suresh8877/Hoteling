const usercontrol=require("../controllers/usercontrol.js")
const express=require("express");
const router=express.Router();
const verify=require("../utils/verifiying.js");

// router.get("/cheker/token",verify.verifyToken,()=>{
//     console.log("Welcome token");
// });
// router.get("/cheker/token/:id",verify.verifyUser,()=>{
//     console.log("Welcome User");
// });
// router.get("/cheker/token/:id",verify.verifyAdmin,()=>{
//     console.log("Welcome Admin");
// });


router.get("/",verify.verifyAdmin,usercontrol.getUsers);

router.get("/countofuser",usercontrol.countofuser);

router.get("/:id",verify.verifyUser,usercontrol.getUser);

router.put("/:id",verify.verifyUser,usercontrol.updateUser);

router.delete("/:id",verify.verifyUser,usercontrol.deleteUser);

module.exports=router
