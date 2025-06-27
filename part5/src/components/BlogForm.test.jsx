import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import NewBlogForm from './NewBlogForm'



const user = userEvent.setup()

test('Form submittion test', async() => {

  const mockFunction = vi.fn()

  render(<NewBlogForm addBlog={mockFunction}/>)

  const title = screen.getByPlaceholderText('title')
  const author = screen.getByPlaceholderText('author')
  const url = screen.getByPlaceholderText('url')
  const createBtn = screen.getByTestId('create-btn')

  await user.type(title, 'test title...')
  await user.type(author, 'test author...')
  await user.type(url, 'test url...')
  await user.click(createBtn)

  expect(mockFunction.mock.calls).toHaveLength(1)
  expect(mockFunction.mock.calls[0][0].title).toBe('test title...')
  expect(mockFunction.mock.calls[0][0].author).toBe('test author...')
  expect(mockFunction.mock.calls[0][0].url).toBe('test url...')
})