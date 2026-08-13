import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

const blog = {
    title: 'Test Blog',
    author: 'akki',
    url: 'test'
}

test('correct details are received when creating a new blog', () => {
    const mockHandler = jest.fn()
    const component = render(<BlogForm createBlog={mockHandler} />)

    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')

    //Fill values
    fireEvent.change(author, { target: { value: blog.author } })
    fireEvent.change(title, { target: { value: blog.title } })
    fireEvent.change(url, { target: { value: blog.url } })

    const addButton = component.getByText('Add')

    fireEvent.click(addButton)

    expect(mockHandler.mock.calls).toEqual(
        expect.arrayContaining([
            expect.arrayContaining([
                expect.objectContaining(blog)
            ])])
    )
})