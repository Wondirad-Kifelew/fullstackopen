import { useState } from 'react'

const Blog = ({ blog, updateLikes, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [showDetails, setShowDetails] = useState(false)

  const befHandleDelete = () => {
    if (window.confirm(`Remove blog "${blog.title} by ${blog.author}"?`)) {
      handleDelete(blog)
    }
  }

  //  togggle vis should move up
  return (
    <div className='blog' style={blogStyle}>
      <div data-testid = 'blog-title-author'>
        {blog.title} {blog.author}{' '}
        <button  onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showDetails && (
        <>
          <a href={blog.url}>{blog.url}</a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            likes <p data-testid='likes'>{blog.likes}</p>
            <button id='like-btn' onClick={() => updateLikes(blog)}>like</button>
          </div>
          {/* <div>creator-- {blog.user.username}</div> */}
          {blog && (
            <div>
              <button id='remove-button' onClick={befHandleDelete}>remove</button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Blog
