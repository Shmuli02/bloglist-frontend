import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: "Canonical string reduction",
  author: "Edsger W. Dijkstra",
  url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
}

test('renders main content', () => {

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    "Canonical string reduction Edsger W. Dijkstra" 
  )
})

test('clicking the button renders full content', () => {

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} toggleVisibility={mockHandler} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  
  // expect(mockHandler.mock.calls).toHaveLength(1)
  expect(component.container).toHaveTextContent(
    "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
  )
  expect(component.container).toHaveTextContent("Likes")
})

test('clicking like button twise handle function called twice', () => {

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} handleAddLike={mockHandler} />
  )

  const button = component.getByText('Like')
  fireEvent.click(button)
  fireEvent.click(button)


  expect(mockHandler.mock.calls).toHaveLength(2)
})