import React, { useState } from 'react'

const BlogForm = ({
  handleBlogSubmit
}) => {

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const handleTitleChange = (event) => {setNewBlogTitle(event.target.value)}
  const handleAuthorChange = (event) => {setNewBlogAuthor(event.target.value)}
  const handleUrlChange = (event) => {setNewBlogUrl(event.target.value)}

  const createNewBlog = (event) => {
    event.preventDefault()
    handleBlogSubmit({
      'title':newBlogTitle,
      'author':newBlogAuthor,
      'url':newBlogUrl
    })

  }
  return (
    <div>
      <form onSubmit={createNewBlog}>
    Title: <input
          id='title'
          value={newBlogTitle}
          onChange={handleTitleChange}
        /><br></br>
    Author: <input
          id='author'
          value={newBlogAuthor}
          onChange={handleAuthorChange}
        /><br></br>
    Url: <input
          id='url'
          value={newBlogUrl}
          onChange={handleUrlChange}
        /><br></br>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm