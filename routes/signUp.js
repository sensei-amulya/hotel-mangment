const express = require("express")
const {SignUp} = require("../controllers/userController")
const router = express.Router()

router.post("/" , SignUp);

module.exports = router