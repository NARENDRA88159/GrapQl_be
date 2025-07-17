
const express=require("express")
const multer = require('multer');
const { ReastaurantSignUp, getallreastaurant } = require("../Controler/Reastaurant")
const storage = multer.memoryStorage();
const upload = multer({ storage });
const Router=express.Router()

Router.post("/reastaurantSignup",upload.single('image'),ReastaurantSignUp)
Router.post("/getallreastaurant",getallreastaurant)

module.exports=Router