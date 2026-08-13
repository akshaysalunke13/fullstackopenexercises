import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        const newBlog = {
            title,
            author,
            url
        }
        createBlog(newBlog)
        clearStates()
    }

    const clearStates = () => {
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>Add new blog</h2>
            <form onSubmit={addBlog}>
                <div>
                    title: <input id='title' value={title} onChange={(event) => setTitle(event.target.value)} />
                </div>
                <div>
                    author: <input id='author' value={author} onChange={(event) => setAuthor(event.target.value)} />
                </div>
                <div>
                    url: <input id='url' value={url} onChange={(event) => setUrl(event.target.value)} />
                </div>
                <div>
                    <button type="submit" id='add-blog-button'>Add</button>
                </div>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm