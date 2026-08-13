import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [isVisible, setIsVisible] = useState(false)

    const incrementLike = () => {
        const newBlog = { ...blog, likes: blog.likes + 1 }
        updateBlog(blog.id, newBlog)
    }

    const delBlog = () => {
        if (window.confirm(`Do you really want to delete "${blog.title}" by ${blog.author}?`)) {
            deleteBlog(blog.id)
        }
    }

    const delButton = () => {
        let isOwner = false
        try {
            isOwner = user.username === blog.user.username
        } catch (e) {
            console.log(e)
        }
        const html = <div><button onClick={delBlog} id='delete-blog'>delete</button></div>
        return isOwner ? html : null
    }

    const blogInfo = () => (
        <div>
            <div id='blog-url'>
                {blog.url}
            </div>
            <div id='blog-author'>
                {blog.author}
            </div>
            <div id='blog-likes'>
                {blog.likes} <button onClick={incrementLike} id='like-blog'>like</button>
            </div>
            <div>{delButton()}</div>
        </div>
    )

    return (
        <div style={blogStyle} className='blog'>
            {blog.title} by {blog.author} <button onClick={() => setIsVisible(!isVisible)} id='show-info'> {isVisible ? 'hide info' : 'show info'} </button>
            <div>
                {isVisible ? blogInfo() : null}
            </div>
        </div>)
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    updateBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

export default Blog