const router = require('express').Router()
const cookieSession = require('cookie-session')
const passport = require('./passport')

router.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['kitty-key']
}))

router.use(passport.initialize())
router.use(passport.session())

router.use('/auth/google', require('./google'))
router.use('/auth/facebook', require('./facebook'))
router.use('/auth/github', require('./github'))

router.get('/auth/logout', (req, res) => {
    req.logout()
    res.clearCookie('user').redirect('/')
})

module.exports = router