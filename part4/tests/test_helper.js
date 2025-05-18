const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlog = [
  {
    title: 'ola',
    author: 'someone new',
    url: 'https://www.youtube.com/',
    likes: 344
  },
  {
    title: 'ola_2',
    author: 'someone_new_2',
    url: 'https://www.youtube.com/asdfsf',
    likes: 66
  }
]

// const nonExistingId = async () => {
//   const blog = new Blog({ content: 'willremovethissoon' })
//   await blog.save()
//   await blog.deleteOne()

//   return blog._id.toString()
// }

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())

}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())

}

module.exports = {
  initialBlog, blogsInDb, usersInDb
}