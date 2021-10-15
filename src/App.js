import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

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
      console.log(user)
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

  const handleBlogSubmit = () => {
    blogService.create({'title':newBlogTitle,'author':newBlogAuthor,'url':newBlogUrl})
  }

  
  const handleLogout = (enevt) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const logout = () => (
    <button onClick={handleLogout}>Logout</button>
  )
  const loginForm = () => {
  }



  return (
    <div>
      <h2>Notes</h2>
      {user === null ? 
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
          />
      </Togglable>
      :
      <div>
        <p>{user.name} logged in {logout()}</p>
        <Togglable buttonLabel='create new blog'>
          <BlogForm
            title={newBlogTitle}
            author={newBlogAuthor}
            url={newBlogUrl}
            handleTitleChange={({ target }) => setNewBlogTitle(target.value)}
            handleAuthorChange={({ target }) => setNewBlogAuthor(target.value)}
            handleUrlChange={({ target }) => setNewBlogUrl(target.value)}
            handleSubmit={handleBlogSubmit}
          />
        </Togglable>
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