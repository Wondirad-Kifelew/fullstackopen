const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
    
})


blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id  
  })
  
        
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  
  await user.save()
  response.status(201).json(savedBlog) 

})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  console.log('---------in delete blog')
  const blog_id = request.params.id
  const user = request.user
  
  
  const blog = await Blog.findById(blog_id)//--blog_given(the one we want to del)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  //only the creator can delete the blog
  
  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'only the creator can delete the blog' })
  }

  const deleted_blog = await Blog.findByIdAndDelete(blog_id)

  if(deleted_blog){
    //remove the blog from the user's blogs
    user.blogs = user.blogs.filter(blog => blog.toString() !== blog_id)
    await user.save()
    response.status(204).end()
  }else{
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body
  const blog = await Blog.findById(request.params.id)
    
  if (!blog) {
    return response.status(404).end()
  }

  blog.likes = likes

  const updatedBlog = await blog.save()
  response.json(updatedBlog)
  
})

module.exports = blogsRouter