const router = require('express').Router()
const GitHubStrategy = require('passport-github').Strategy
const keys = require('../keys')
const passport = require('./passport')
const User = require('../models/User')

passport.use(
    new GitHubStrategy({
        clientID: keys.github.clientID,
        clientSecret: keys.github.clientSecret
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
                    photo: profile._json.avatar_url,
                    googleId: profile.id

                }).save()
                done(null, user)
            }
        } catch (error) {
            done(error)
        }
    })
)

router.get('/', passport.authenticate('github', {
    scope: ['profile', 'email']
}))

router.get('/redirect', passport.authenticate('github'), (req, res) => {
    res.cookie('user', req.user).redirect('/')
})

module.exports = router