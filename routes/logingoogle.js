const express=require('express')
const passport=require('passport');
const jwt=require('jsonwebtoken')
const router=express.Router()
const GoogleStrategy=require('passport-google-oauth20').Strategy





app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
}))



app.use(passport.initialize())
app.use(passport.session())



passport.use(
    new GoogleStrategy({
        clientID: process.env.Client_ID,
        clientSecret: process.env.Client_secret,
        callbackURL: "http://localhost:3030/auth/google/callback",
    },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile)
        }
    )
);

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))




app.get("/", (req, res) => {
    res.send("<a href='/auth/google'> Login with google </a>")
  })
  

app.get("/auth/google/",
    passport.authenticate("google", { scope: ["profile", "email"] })
)


app.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("/profile")
    }
)

app.get("/profile", (req, res) => {
    res.send(`<h1>Welcome ${req.user.displayName} </h1>`)
})