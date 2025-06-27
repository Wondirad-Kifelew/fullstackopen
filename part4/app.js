require('express-async-errors') 
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

logger.info('connecting to', config.MONGODB_URI)

const connectToMongodb = async () => {
  try{
    await mongoose.connect(config.MONGODB_URI)
    logger.info('connected to MongoDB')
  }catch(error){
    logger.error('error connection to MongoDB:', error.message)
  }
}
connectToMongodb()
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

if(process.env.NODE_ENV==='test'){
  const resetRouter = require('./controllers/testing')
  app.use('/api/testing', resetRouter)
}
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app