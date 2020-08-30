const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../keys')
const passport = require('./passport')
const User = require('../models/User')

passport.use(
    new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: 'https://kitty-share.herokuapp.com/auth/google/redirect'
    }, async (_accessToken, _refreshToken, profile, done) => {
        //console.log(JSON.stringify(profile, null, 4))
        try {
            let user = await User.findOne({ googleId: profile.id })
            if (user)
                done(null, user)
            else {
                user = await new User({
                    name: profile.displayName,
                    email: profile._json.email,
                    photo: profile._json.picture,
                    googleId: profile.id

                }).save()
                done(null, user)
            }
        } catch (error) {
            done(error)
        }
    })
)

router.get('/', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

router.get('/redirect', passport.authenticate('google'), (req, res) => {
    res.cookie('user', req.user).redirect('/')
})

module.exports = router