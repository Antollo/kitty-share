const router = require('express').Router()
const { param, body, validationResult } = require('express-validator')
const Post = require('../models/Post')
const db = require('../db')

router.post('/add', [
    body('content').isString().not().isEmpty(),
    body('parentId').custom(id => typeof id === 'undefined' || db.Types.ObjectId.isValid(id))
], async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() })

    if (!req.user)
        return res.status(401).json({ errors: ['not logged in'] })

    try {
        if (db.Types.ObjectId.isValid(req.body.parentId)) {
            const { id } = await new Post({
                content: req.body.content,
                user: req.user._id
            }).save()

            await Post.updateOne(
                {
                    _id: req.body.parentId
                },
                {
                    $push: { comments: id }
                }
            )

            return res.status(201).json({ messages: ['ok'], _id: id })
        } else {
            await new Post({
                content: req.body.content,
                user: req.user._id,
                topLevel: true
            }).save()
        }
        return res.status(201).json({ messages: ['ok'] })
    } catch (error) {
        return res.status(500).json({ errors: [error] })
    }
})

router.get('/like/:postId', [
    param('postId').custom(id => db.Types.ObjectId.isValid(id))
], async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() })

    if (!req.user)
        return res.status(401).json({ errors: ['not logged in'] })

    try {

        /*await Post.deleteMany({
            content: /^[\s\S]$/
        })*/


        if ((await Post.updateOne(
            {
                _id: req.params.postId,
                likes: { $ne: req.user._id }
            },
            {
                $inc: { likeCount: 1 },
                $push: { likes: req.user._id }
            }
        )).nModified === 0)
            await Post.updateOne(
                {
                    _id: req.params.postId,
                    likes: req.user._id
                },
                {
                    $inc: { likeCount: -1 },
                    $pull: { likes: req.user._id }
                }
            )
        return res.status(200).json({ messages: ['ok'] })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ errors: [error] })
    }
})

router.get('/dislike/:postId', [
    param('postId').custom(id => db.Types.ObjectId.isValid(id))
], async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() })

    if (!req.user)
        return res.status(401).json({ errors: ['not logged in'] })

    try {
        if ((await Post.updateOne(
            {
                _id: req.params.postId,
                dislikes: { $ne: req.user._id }
            },
            {
                $inc: { dislikeCount: 1 },
                $push: { dislikes: req.user._id }
            }
        )).nModified === 0)
            await Post.updateOne(
                {
                    _id: req.params.postId,
                    dislikes: req.user._id
                },
                {
                    $inc: { dislikeCount: -1 },
                    $pull: { dislikes: req.user._id }
                }
            )
        return res.status(200).json({ messages: ['ok'] })
    } catch (error) {
        return res.status(500).json({ errors: [error] })
    }
})

router.get('/:postId', [
    param('postId').custom(id => db.Types.ObjectId.isValid(id))
], async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() })

    if (!req.user)
        return res.status(401).json({ errors: ['not logged in'] })

    try {
        const post = await Post.findOne({ _id: req.params.postId })
            .select({
                _id: 1,
                content: 1,
                user: 1,
                date: 1,
                likeCount: 1,
                likes: {
                    $elemMatch: { $eq: req.user._id }
                },
                dislikeCount: 1,
                dislikes: {
                    $elemMatch: { $eq: req.user._id }
                },
                comments: 1
            })
            .populate('user', 'name photo _id')
            .populate({
                path: 'comments',
                select: '_id content user date',
                options: { sort: { date: 1 } },
                populate: {
                    path: 'user',
                    select: 'name photo _id'
                }
            })
            .lean()
        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json({ errors: [error] })
    }
})

router.get('/', async (req, res) => {

    if (!req.user)
        return res.status(401).json({ errors: ['not logged in'] })

    const posts = await Post.find({ topLevel: true })
        .select({
            _id: 1,
            content: 1,
            user: 1,
            date: 1,
            likeCount: 1,
            likes: {
                $elemMatch: { $eq: req.user._id }
            },
            dislikeCount: 1,
            dislikes: {
                $elemMatch: { $eq: req.user._id }
            },
            comments: 1
        })
        .limit(100)
        .sort({ date: 1 })
        .populate('user', 'name photo _id')
        .populate({
            path: 'comments',
            select: '_id content user date',
            options: { sort: { date: 1 } },
            populate: {
                path: 'user',
                select: 'name photo _id'
            }
        })
        .lean()
    return res.status(200).json(posts)
})

module.exports = router