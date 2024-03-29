const express = require('express')
const app = express()
require('express-async-errors')

const cors = require('cors')
const middleware = require('./utils/middleware.js');
const mongoose = require('mongoose')
const loginRouter = require('./controllers/login')
const blogsRouter=require('./controllers/blogs.js')
const usersRouter=require('./controllers/users.js')
const config = require('./utils/config.js')



mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api',usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports =app

