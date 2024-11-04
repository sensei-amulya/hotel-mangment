const nodeMailer = require("nodemailer");
const { v4: uuidv4 } = require('uuid');
const userModel = require("../models/usermod");
const { ApiResponse } = require("../middelwares/apiResponse")
const bcrypt = require('bcryptjs')

const transporter = nodeMailer.createTransport({
    service : "gmail",
    secure : true,
    port : 465,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    }
})

const forgetPasswordHandler = async (req, res) => {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        res.json(new ApiResponse(400, user, "User not found with this email"))
    }
    else {
        const resetToken = uuidv4();
        user.resetPasswordToken = resetToken;
        console.log(resetToken)
        user.resetPassTokenExpiry = Date.now() + 3600000;
        await user.save()

        const resetUrl = `http://localhost:3000/password/reset/${resetToken}`

        const mailOptions = {
            from: "amulyagupta26@gmail.com",
            to: email,
            subject: 'Password Reset Request',
            text: `You requested a password reset. Click the link to reset your password: ${resetUrl}`,
            html: `<p>You requested a password reset. http://localhost:3000/password/reset/${resetToken}`
        };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).send(`Error sending email ${error}`);
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send('Password reset email sent');
            }
        });
    }
}

const resetPasswordHandler = async (req,res) => {
    const {resetToken} = req.params;
    const {new_Password} = req.body;
    const user = await userModel.findOne({
        resetPasswordToken : resetToken,
        resetPassTokenExpiry : { $gt: Date.now() }
    })

    if(!user){
        res.json(new ApiResponse(400 , user , "Password reset token is invalid or has expired."))
    }
    else{
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(new_Password, salt, async function(err, hash) {
                user.password = hash;
                user.resetToken = null;
                user.resetTokenExpires = null;
                await user.save();
            });
        });
        res.json(new ApiResponse(200 , user , "Password reset done"))
    }
}

module.exports = {forgetPasswordHandler , resetPasswordHandler}