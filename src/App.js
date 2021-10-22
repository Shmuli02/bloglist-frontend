import React, { useState, useEffect, useRef } from 'react'
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
  // const [errorMessage, setErrorMessage] = useState(null)
  const [, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  // const [loginVisible, setLoginVisible] = useState(false)
  const newBlogFormRef = useRef()
  blogs.sort(function (a, b) {
    return b.likes - a.likes
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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

  const handleBlogSubmit = (NewBlogObject) => {
    newBlogFormRef.current.toggleVisibility()
    blogService
      .create(NewBlogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }


  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const logout = () => (
    <button onClick={handleLogout}>Logout</button>
  )

  const handleAddLike = (event) => {
    const newBlogObject = blogs.filter(blog => blog.id === event.target.value)[0]
    newBlogObject.likes += 1
    blogService
      .update(newBlogObject.id, newBlogObject)

    blogService.getAll().then(blogs2 =>
      setBlogs(blogs2)
    )
  }

  const handleBlogDelete = (event) => {
    blogService.deleteBlog(event.target.value)
    blogService.getAll().then(blogs2 =>
      setBlogs(blogs2)
    )
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
          <Togglable buttonLabel='create new blog' ref={newBlogFormRef}>
            <BlogForm
              handleBlogSubmit={handleBlogSubmit}
            />
          </Togglable>
          {blogs.length === 0 ?
            <div>
              <p>Ei blogeja</p>
            </div>
            :
            <div>
              {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} handleAddLike={handleAddLike} handleBlogDelete={handleBlogDelete} />
              )}
            </div>
          }
        </div>

      }

      {user !== null}
    </div>
  )
}

export default App