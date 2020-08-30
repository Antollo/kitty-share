const passport = require('passport')
const User = require('../models/User')

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    try {
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            const user = await User.findById(id)
            done(null, user)
        }
        else
            done('id is not valid key')
    } catch (error) {
        done(error)
    }
})

module.exports = passport