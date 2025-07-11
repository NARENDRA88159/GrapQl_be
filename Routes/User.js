const express = require("express");
const { SignUp, GetallUser } = require("../Controler/User.js");

const Router = express.Router();

Router.post("/signUp", SignUp); // also fixed typo: "singnUp" ➜ "signUp"
Router.post("/getallUser", GetallUser); // also fixed typo: "singnUp" ➜ "signUp"

module.exports = Router;
