import React from "react"

const BlogForm = ({
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  handleSubmit
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
    Title: <input
      value={title}
      onChange={handleTitleChange}
    /><br></br>
    Author: <input
      value={author}
      onChange={handleAuthorChange}
    /><br></br>
    Url: <input
      value={url}
      onChange={handleUrlChange}
    /><br></br>
    <button type="submit">Create</button>
  </form>  
    </div>
  )
}

export default BlogForm