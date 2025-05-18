const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')


//gets username and pass from user search for that user in db. if found check the pass. good? 
//create a token and sent it back to the user
loginRouter.post('/', async (request, response) => {
  // console.log('in login post handler')
  const { username, password } = request.body
  // console.log('username and password from test: ', username, password)
  const user = await User.findOne({ username })
  // console.log('user fetched from db looks like: ', user)
  
  const passwordCorrect = user === null? 
    false : await bcrypt.compare(password, user.passwordHash)
    
  // console.log('password compare: ', password, user.passwordHash)  
  // console.log('passwordCorrect: ', passwordCorrect)

  if(!(passwordCorrect && user)) {
    return response.status(401).json({
      error: 'invalid username or/and password'
    })
  }
  // console.log('----auth passed----')  
  const UserToken = {
    username: user.username,
    id: user._id
  } 
  const token = jwt.sign(UserToken, process.env.SECRET, { expiresIn: 60*60*24 }) // 24 hours

  response.status(200).send({token, username: user.username, name: user.name})

})

module.exports = loginRouter