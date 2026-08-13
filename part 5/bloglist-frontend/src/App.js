import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [notification, setNotification] = useState(null)
    const [notificationType, setNotificationType] = useState('')
    const [blogFormVisible, setBlogFormVisible] = useState(false)

    useEffect(() => {
        blogService.getAll().then(blogs =>
        {
            blogs.sort((a, b) => {
                if ( a.likes < b.likes) {
                    return -1
                }
                if ( a.likes > b.likes) {
                    return 1
                } else {
                    return 0
                }
            })
            setBlogs(blogs)
        }
        )
    }, [])

    useEffect(() => {
        const loggedUserJson = window.localStorage.getItem('blogAppUser')
        if (loggedUserJson) {
            const user = JSON.parse(loggedUserJson)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('blogAppUser', JSON.stringify(user))
            setUser(user)
            setUsername('')
            setPassword('')
            blogService.setToken(user.token)
            updateNotification('login successful.')
        } catch (exception) {
            console.log('Error occured while logging in', exception)
            updateNotification('Wrong username or password')
        }
    }

    const loginForm = () => (
        <div>
            <LoginForm handleSubmit={handleLogin} username={username} password={password} handleUsernameChange={({ target }) => setUsername(target.value)} handlePasswordChange={({ target }) => setPassword(target.value)} />
        </div>
    )

    const addBlog = async (newBlog) => {
        await blogService.create(newBlog)
        setBlogs(await blogService.getAll())
        setBlogFormVisible(false)
    }

    const updateBlog = async (id, newBlog) => {
        await blogService.update(id, newBlog)
        setBlogs(await blogService.getAll())
    }

    const deleteBlog = async (id) => {
        await blogService.deleteBlog(id)
        //const newBlogs = blogs.filter(b => b.id !== id)
        setBlogs(await blogService.getAll())
    }

    const blogForm = () => {
        const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
        const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

        return (
            <div>
                <div style={hideWhenVisible}>
                    <button onClick={() => setBlogFormVisible(true)} id='add-blog'>Add Blog</button>
                </div>
                <div style={showWhenVisible}>
                    <BlogForm createBlog={addBlog} />
                    <button onClick={() => setBlogFormVisible(false)}>Hide</button>
                </div>
            </div>)
    }

    const handleLogout = () => {
        window.localStorage.clear()
        setUser(null)
    }

    const updateNotification = (message, type) => {
        setNotification(message)
        setNotificationType(type)
        setTimeout(() => {
            setNotification(null)
            setNotificationType('')
        }, 5000)
    }

    return (
        <div>
            <Notification message={notification} type={notificationType} />

            {user === null ?
                <div>
                    {loginForm()}
                </div> :
                <div>
                    {user.name} logged in. <button onClick={handleLogout}>Logout</button>
                    {blogForm()}
                    <h2>blogs</h2>
                    {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user}/>
                    )}
                </div>
            }

        </div>
    )
}

export default App