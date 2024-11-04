const express=require('express')
const passport=require('passport');
const jwt=require('jsonwebtoken')
const router=express.Router()
const GoogleStrategy=require('passport-google-oauth20').Strategy





/*app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
}))



app.use(passport.initialize())
app.use(passport.session())
*/


passport.use(
    new GoogleStrategy({
        clientID: process.env.ClientID,
        clientSecret: process.env.clientSEcret,
        callbackURL: "http://localhost:8000/auth/google/callback",
    },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile)
        }
    )
);

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))




/*router.get("/", (req, res) => {
    res.send("<a href='/auth/google'> Login with google </a>")
  })*/
  

router.get("/",
    passport.authenticate("google", { scope: ["profile", "email"] })
)


router.get("/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        const name = req.user.displayName;
        const token =jwt.sign({name},process.env.secret)
        console.log(token)
        res.redirect("/profile")
    }
)

/*router.get("/profile", (req, res) => {
    res.send(`<h1>Welcome ${req.user.displayName} </h1>`)
})*/



module.exports = router;