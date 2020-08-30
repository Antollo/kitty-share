const { model, Schema } = require('../db')

const Post = model('Post', {
    content: { type: String, required: true, minlength: 1, maxlength: 2048 },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    date: { type: Date, default: Date.now }
})

module.exports = Post