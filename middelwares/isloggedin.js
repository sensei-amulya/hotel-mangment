const jwt = require('jsonwebtoken')
require('dotenv').config()





const islogged = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (token) {
            const data = jwt.verify(token, process.env.secret)
            req.user = data;
        }
        next();
    } catch (err) {
        res.status(400).json({ msg: err.msg })
        console.log(err)
    }
}

module.exports = {
    islogged,
}













