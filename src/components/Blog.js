import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, handleAddLike,handleBlogDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }


  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable key={blog.id} buttonLabel='view'>
        <p>Url: {blog.url}</p>
        <p>Likes: {blog.likes} <button onClick={handleAddLike} value={blog.id}>Like</button></p>
        <button onClick={handleBlogDelete} value={blog.id} >Delete</button>
      </Togglable>
    </div>
  )
}

export default Blog