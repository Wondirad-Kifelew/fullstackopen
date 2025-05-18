const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require ('./test_helper')
const User = require('../models/user')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  
  //get all the blogs from db and add their ids in the user.blogs array
  const blogs = await Blog.find({})
  user.blogs = blogs.map(blog => blog._id)
  

  await user.save()


})
describe('when there is initially one user in db', () => {
  
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'newuser',
      name: 'New User',
      password: 'password'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1) 

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
  
  test('creation fails with proper status code and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()
    // console.log("users at START: ", usersAtStart)
    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    assert(result.body.error.includes('`username` to be unique'))
    
    const usersAtEnd = await helper.usersInDb()
    // console.log("users at END: ", usersAtEnd)

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
  test('creation fails with proper status code and message if pass is <3 char long', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ererer',
      name: 'new user',
      password: 'sa'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    assert(result.body.error.includes('password must be at least 3 characters long'))
    
    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
  test('creation fails with proper status code and message if username is <3 char long', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'er',
      name: 'new user',
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    assert(result.body.error.includes('shorter than the minimum allowed length'))
    
    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
  // check to see if a user successfully logs in and gets a token
  test('check to see if a user successfully logs in', async ()=>{
    const user = {
      username: 'root',
      password: 'sekret'
    }
    
    console.log('------------in login test------------')
    const result = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert(result.body.token)
    console.log('"we need this TOKEN: "', result.body.token)

    // assert.strictEqual(result.body.username, user.username)  

  })
})

after(async () => {
  await mongoose.connection.close()
})

