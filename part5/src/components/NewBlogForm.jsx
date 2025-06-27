import React, { useState } from 'react'

const NewBlogForm = ({ addBlog }) => {

  const [newBlog, setNewBlog]= useState({
    title: '',
    author: '',
    url: '',
  })

  const onFormChange= (event) => {

    const { name, value } = event.target

    setNewBlog({
      ...newBlog,
      [name]:value,
    })
  }

  const addBlogHere = async (event) => {
    event.preventDefault()

    const resp = await addBlog(newBlog)

    if (resp) setNewBlog({ title: '', author:'', url:'' })

    console.log('values cleared? ', newBlog.title, newBlog.author, newBlog.url)
  }


  return (
    <form onSubmit={addBlogHere}>
      <div>
      title
        <input
          type="text"
          name="title"
          placeholder='title'
          value={newBlog.title}
          onChange={onFormChange}
        />
      </div>
      <div>
      author
        <input
          type="text"
          name="author"
          placeholder='author'
          value = {newBlog.author}
          onChange={onFormChange}
        />
      </div>
      <div>
      url
        <input
          type="text"
          name="url"
          placeholder='url'
          value = {newBlog.url}
          onChange={onFormChange}

        />
      </div>

      <button type="submit" data-testid="create-btn">create</button>
    </form>
  )
}

export default NewBlogForm
