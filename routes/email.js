const express = require("express");
const router = express.Router();
const {forgetPasswordHandler, resetPasswordHandler} = require("../controllers/forgetpass")

router.post("/password/reset" , forgetPasswordHandler);

router.post("/password/reset/:resetToken" , resetPasswordHandler);

module.exports = router;