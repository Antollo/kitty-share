const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const Post = require('../models/Post')

router.post('/add', [
    check('content').isString().not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() })

    if (!req.user)
        return res.status(401).json({ errors: ['not logged in'] })

    try {
        await new Post({
            content: req.body.content,
            user: req.user._id
        }).save()
        return res.status(201).json({ messages: ['ok'] })
    } catch (error) {
        return res.status(500).json({ errors: [error] })
    }

})

router.get('/', async (req, res) => {
    const posts = await Post.find({})
        .sort({ date: -1 })
        .select('_id content user date')
        .limit(100)
        .populate('user', 'name photo _id')
        .lean()
    return res.status(200).json(posts)
})



module.exports = router