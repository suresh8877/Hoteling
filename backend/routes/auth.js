const authcontrol=require("../controllers/authcontrol.js")
const usercontrol=require("../controllers/usercontrol.js")

const express = require("express")
const router=express.Router()

router.post("/",authcontrol.register);

router.post("/login",authcontrol.login);

module.exports=router
