﻿const express = require('express')
const app = express()
const secure = require('express-force-https')

const port = process.env.PORT || 3001

app.use(secure)
app.use(express.json())
app.use('/', express.static(`${__dirname}/client/build/`))
app.get('/', (_req, res) => res.sendFile(`${__dirname}/client/build/index.html`))

app.use('/', require('./auth/auth'))
app.use('/api', require('./api/api'))

app.get('*', (_req, res) => res.sendFile(`${__dirname}/client/build/index.html`))


app.listen(port, () => console.log(`Running on port ${port}`))