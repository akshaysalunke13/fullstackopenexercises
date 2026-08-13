import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
    title: 'Test Blog',
    author: 'akki',
    likes: 1,
    url: 'test'
}

test('blog renders blog title and author', () => {
    const component = render(<Blog blog={blog}/>)

    expect(component.container).toHaveTextContent('Test Blog')
    expect(component.container).toHaveTextContent('akki')
})

test('url and likes are shown when button is clicked', () => {
    const component = render(<Blog blog={blog}/>)

    const button = component.getByText('show info')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('test')
    expect(component.container).toHaveTextContent('1')
})

test('event handler is called on `like` button click', () => {
    const mockHandler = jest.fn()
    const component = render(<Blog blog={blog} updateBlog={mockHandler}/>)

    const button = component.getByText('show info')
    fireEvent.click(button)

    const likeButton = component.getByText('like')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})