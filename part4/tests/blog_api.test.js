const {describe, test, beforeEach, after} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')

let token = null
const api = supertest(app)
describe('when there is initially some blogs saved', ()=>{
  beforeEach(async () => {
    await Blog.deleteMany({})
    const userInDb = await User.find({})
    helper.initialBlog.forEach((blog) => {
      blog.user = userInDb[0]._id
    })
    await Blog.insertMany(helper.initialBlog)
      
    const user = {
      username: 'root',
      password: 'sekret'
    }
    const response = await api.post('/api/login')
      .send(user)
    token = response.body.token
    
  })
  test('blogs are returned as json', async ()=>{
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
  })
  test('all blogs are returned', async () => {
    const blogsAtStart = await helper.blogsInDb()
    
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)   

    assert.strictEqual(response.body.length, blogsAtStart.length)
  })
  
  test('"id" field exists in the db', async () => {
    const response = await api.get('/api/blogs')
    assert(response.body[0].id)
  })
  
  test('add blog succesfully to the db', async () => {
    console.log('-----------in add blog test')
    const blogsAtStart = await helper.blogsInDb()

    const testBlog = {
      title: 'new blog',
      author: 'sdfs ',
      url: 'https://www.youtube.com/dfd',
      likes: 3
    }
    
    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(testBlog).expect(201).expect('Content-Type',/application\/json/)
    
    const blogAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtStart.length + 1, blogAtEnd.length)

    const titles = blogAtEnd.map(b => b.title)
    assert(titles.includes('new blog'))
  })

  test('if Token is not provided, respond with 401', async () => {
    const beforeBlogs = await helper.blogsInDb()
    const testBlog = {
      title: 'new blog',
      author: 'sdfs ',
      url: 'https://www.youtube.com/dfd',
      likes: 3
    }
    await api.post('/api/blogs')
      .send(testBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
    const afterBlogs = await helper.blogsInDb()

    assert.strictEqual(beforeBlogs.length, afterBlogs.length) 
  })
  describe('If some fields are missing like, ', () => {
    test('if "like" field doesn\'t exist, default to 0', async () => {
      const blogWithNoLike = {
        title: 'some title',
        author: 'sdfs ',
        url: 'https://www.youtube.com/dfd'
      }
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blogWithNoLike)
        .expect(201)
        .expect('Content-Type',/application\/json/)

      const blogAtEnd = await helper.blogsInDb()
      const addedBlog = blogAtEnd.find(b => b.title === 'some title')
      assert.strictEqual(addedBlog.likes, 0)
    })
    test('if the "url" field doesn\'t exist, respond with 400 Bad request', async () => {
      const blogWithNoUrl = {
        title: 'some title',
        author: 'sdfs ',
        likes: 54
      }
      await api.post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blogWithNoUrl).expect(400).expect('Content-Type',/application\/json/)
    })
    test('if the "title" field doesn\'t exist, respond with 400 Bad request', async () => {
      //no like no prob: default to 0
      const blogWithNoTitle = {
        author: 'sdfs ',
        url:'https://chatgpt.com/c/681c3faf-6a1c-800a-9f95-8cd7490c4b79'
      }
      await api.post('/api/blogs')
        .set('Authorization',`Bearer ${token}`)
        .send(blogWithNoTitle).expect(400).expect('Content-Type',/application\/json/)
    })
  })
  
  test('should respond with 400 if client provides a malformed ID', async () => {
    const blogsInDb = await helper.blogsInDb()
    const singleNote = blogsInDb[0]

    await api.get(`/api/blogs/${singleNote.id}somethingswedontwant`)
      .expect(400)
  })
  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      console.log('-----------in delete blog test')
      const blogsBefDel = await helper.blogsInDb()
      const blogToDelete = blogsBefDel[0]
      console.log('-----blog to delete looks like---', blogToDelete)

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)
      const blogsAfterDel = await helper.blogsInDb()
      assert.strictEqual(blogsAfterDel.length, blogsBefDel.length - 1)

      const titles = blogsAfterDel.map(b => b.title)
      assert(!titles.includes(blogToDelete.title))
      assert(!titles.includes(blogToDelete.title))
      assert(!titles.includes(blogToDelete.url))
    })  
  })
  describe('updating the blog\'s number of likes', () =>{
    test('succeeds with status code 200 if id is valid', async () => {
      const blogsBefUpdate = await helper.blogsInDb()
      const blogToUpdate = blogsBefUpdate[0]

      const updatedDataFromClient = {
        likes: 334
      }
      
      await api.put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedDataFromClient).expect(200).expect('Content-Type',/application\/json/)

      const blogsAfterUpdate = await helper.blogsInDb()
      
      const updatedDataInDB = blogsAfterUpdate.find(b => b.id === blogToUpdate.id)
      assert.deepEqual(updatedDataFromClient.likes, updatedDataInDB.likes)
    })
  })
})
after(async () => {
  await mongoose.connection.close()
})

