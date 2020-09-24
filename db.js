const mongoose = require('mongoose')
const keys = require('./keys')

mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('DB connection established'))
    .catch(err => console.error(err))

mongoose.connection.on('error', err => console.error(err))

module.exports = mongoose