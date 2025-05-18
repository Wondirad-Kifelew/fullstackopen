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
  
  console.log('user in delete blog', user)
  
  const blog = await Blog.findById(blog_id)//--blog_given(the one we want to del)
  console.log('blog in delete blog', blog)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  //only the creator can delete the blog
  console.log('passed--- the !blog')
  console.log('yaschegerut', blog.user, user._id)
  console.log('blog.useridstring and useridstring', blog.user.toString(), user._id.toString())
  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'only the creator can delete the blog' })
  }
  console.log('blog id looks like ', blog_id)
  const deleted_blog = await Blog.findByIdAndDelete(blog_id)
  console.log('deleted blog', deleted_blog)
  if(deleted_blog){
    //remove the blog from the user's blogs
    user.blogs = user.blogs.filter(blog => blog.toString() !== blog_id)
    await user.save()
    response.status(204).end()
  }else{
    response.status(404).end()
  }
    
  
})
//what if we wanted to update other than 'like'???
blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body

  const blog = await Blog.findById(request.params.id)
    
  if (!blog) {
    return response.status(404).end()
  }

  blog.likes = likes

  const updatedBlog = blog.save()
  response.json(updatedBlog)
  
    
  // .catch(error => next(error))
})

module.exports = blogsRouter