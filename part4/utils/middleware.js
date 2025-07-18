const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  if(process.env.NODE_ENV !== 'test'){
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
  }
  next()
}
//modifies the request object to include the token and used in app.js
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if(authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }else{
    request.token =  null
  }

  next()
}
const userExtractor = async (request, response, next) =>{

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  
  if(!request.token || !decodedToken){
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  if(!decodedToken.id){
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  
  const user = await User.findById(decodedToken.id)
  
  if (!user) {
    return response.status(400).json({ error: 'user not found' })
  }

  request.user = user
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


const errorHandler = (error, request, response, next) => {
  if (process.env.NODE_ENV !== 'test')
    logger.error('Error message: ', error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  }
  next(error)
}

module.exports ={ requestLogger, tokenExtractor,userExtractor, unknownEndpoint, errorHandler }