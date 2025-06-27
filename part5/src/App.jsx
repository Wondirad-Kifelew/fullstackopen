import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'



const App = () => {
  const blogFormRef = useRef()

  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  //at the start of the app, we check if there is a user logged in
  // if there is user info must be saved in local storage so use that to stay logged in

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage(`Welcome ${user.username}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (error) {
      console.error('Login failed', error)
      setErrorMessage('Error: Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  // const loginForm = () => (

  //   )
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    console.log('user logged out')
  }
  const addBlog = async (blogObject) => {

    const blog = {
      title: blogObject.title,
      author: blogObject.author,
      url: blogObject.url,

    }
    try {
      const response = await blogService.create(blog)
      setBlogs(blogs.concat(response))
      setErrorMessage(`A new blog ${response.title} by ${response.author} added`)
      blogFormRef.current.toggleVisibility()

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (error) {
      console.log(error.response.data)
    }

  }
  const updateLikes = async (blogToUpdate) => {

    const newObj = ({
      ...blogToUpdate, likes:blogToUpdate.likes +1
    })

    try {
      const response = await blogService.update(newObj)
      setBlogs(blogs.map(b => b.id === response.id ? response : b))

      console.log('responsedata after update: ', response)
    } catch (error) {
      console.log('Error: ', error)
    }
  }
  const handleDelete = async (blogToDel) => {
    try {
      const response = await blogService.remove(blogToDel)
      setBlogs(blogs.filter(b => b.id!==blogToDel.id))
      setErrorMessage(`The blog "${blogToDel.title}" has been removed successfully!`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (error) {
      console.log('in error block: ', error.response.data.error)
      setErrorMessage(`Error: ${error.response.data.error}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ?
        <LoginForm handleLogin={handleLogin}/> :
        <div>
          <p data-testid = 'login-msg'> logged in as {user.username}</p>
          <button onClick={handleLogout}>Logout</button>
          <h2>create new</h2>

          {/* addBlogForm() */}

          <Togglable buttonLabel= 'New note' ref={blogFormRef}>
            <NewBlogForm addBlog={addBlog}/>
          </Togglable>
          <h2>blogs</h2>
        </div>
      }
      {sortedBlogs.map(blog =>
        <div key={blog.id} >
          <Blog
            blog={blog}
            handleDelete={handleDelete}
            updateLikes={updateLikes}
          />
        </div>
      )}
    </div>
  )

}
export default App