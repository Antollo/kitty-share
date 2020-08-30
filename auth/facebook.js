const router = require('express').Router()
const FacebookStrategy = require('passport-facebook').Strategy
const keys = require('../keys')
const passport = require('./passport')
const User = require('../models/User')

passport.use(
    new FacebookStrategy({
        clientID: keys.facebook.clientID,
        clientSecret: keys.facebook.clientSecret,
        callbackURL: '/auth/facebook/redirect',
        profileFields: ['id', 'displayName', 'name', 'emails', 'picture.type(large)']
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
                    photo: profile._json.picture.data.url,
                    googleId: profile.id

                }).save()
                done(null, user)
            }
        } catch (error) {
            done(error)
        }
    })
)

router.get('/', passport.authenticate('facebook', { scope: ['email'] }))

router.get('/redirect', passport.authenticate('facebook'), (req, res) => {
    res.cookie('user', req.user).redirect('/')
})

module.exports = router