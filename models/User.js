const { model } = require('../db')

const User = model('User', {
    name: { type: String, required: true, minlength: 1, maxlength: 256 },
    email: { type: String, required: true, minlength: 1, maxlength: 256 },
    photo: { type: String, required: true },
    googleId: { type: Number },
    githubId: { type: Number },
    facebookId: { type: Number }
})

module.exports = User