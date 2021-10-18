import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, handleAddLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }


  return (
    <div style={blogStyle}>
      {blog.title}
      <Togglable key={blog.id} buttonLabel='view'>
        <p>Url: {blog.url}</p>
        <p>Likes: {blog.likes} <button onClick={handleAddLike} value={blog.id}>Like</button></p>
        <p>Author: {blog.author}</p>
      </Togglable>
    </div>
  )
}

export default Blog