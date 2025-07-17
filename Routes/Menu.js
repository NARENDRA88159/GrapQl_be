
const express=require("express")
const multer = require('multer');
const { AddMenuItem, getAllMenuItemsInRestaurant } = require("../Controler/Menu");

const storage = multer.memoryStorage();
const upload = multer({ storage });
const Router=express.Router()

Router.post("/menuItemAdd",upload.single('image'),AddMenuItem)
Router.post("/:id/menu",getAllMenuItemsInRestaurant)

module.exports=Router