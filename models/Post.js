const { model, Schema } = require('../db')

const Post = model('Post', {
    content: { type: String, required: true, minlength: 1, maxlength: 2048 },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    date: { type: Date, default: Date.now, required: true },
    likeCount: { type: Number, default: 0, required: true },
    likes: [{type : Schema.Types.ObjectId, ref: 'User', default: [], required: true }],
    dislikeCount: { type: Number, default: 0, required: true },
    dislikes: [{type : Schema.Types.ObjectId, ref: 'User', default: [], required: true }],
    topLevel: { type: Boolean, required: false },
    comments: [{ type : Schema.Types.ObjectId, ref: 'Post', default: [], required: true }]
})

module.exports = Post