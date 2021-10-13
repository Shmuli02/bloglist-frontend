import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = () => {
    blogService.create({'title':newBlogTitle,'author':newBlogAuthor,'url':newBlogUrl})
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const newBlogForm = () => (
    <form onSubmit={addBlog}>
    Title: <input
      value={newBlogTitle}
      onChange={({ target }) => setNewBlogTitle(target.value)}
    /><br></br>
    Author: <input
      value={newBlogAuthor}
      onChange={({ target }) => setNewBlogAuthor(target.value)}
    /><br></br>
    Url: <input
      value={newBlogUrl}
      onChange={({ target }) => setNewBlogUrl(target.value)}
    /><br></br>
    <button type="submit">Create</button>
  </form>  
  )
const handleLogout = (enevt) => {
  window.localStorage.removeItem('loggedBlogappUser')
  setUser(null)
}

const logout = () => (
  <button onClick={handleLogout}>Logout</button>
)


  return (
    <div>
      
      <h2>Login</h2>

      {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged in {logout()}</p>
        {newBlogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      
    </div>
      
    }

      {user !== null}


      
    </div>
  )
}

export default App