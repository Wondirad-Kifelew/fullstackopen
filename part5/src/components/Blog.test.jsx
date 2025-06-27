import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'


test('renders title and author', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'testUrl.com'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('test title' ,{ exact: false })
  const element2 = screen.getByText('test author', { exact: false })
  expect(element).toBeDefined()
  expect(element2).toBeDefined()
})
test('doesn\'t render url and likes', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'testUrl.com',
    likes: 3
  }

  render(<Blog blog={blog} />)

  const urlElement = screen.queryByText('testUrl.com' ,{ exact: false })
  const likesElement = screen.queryByText('likes', { exact: false })

  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()
})

test('clicking "Show details" btn should reveal url and likes', async () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'testUrl.com',
    likes: 3
  }


  render(
    <Blog blog={blog} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const urlFound = screen.getByText('testUrl.com', { exact:false })
  const likesFound =screen.getByText('likes', { exact:false })

  expect(urlFound).toBeDefined()
  expect(likesFound).toBeDefined()
})

test('event handler gets triggered twice if like button is clicked twice', async() => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'testUrl.com',
    likes: 3
  }

  const mockFunc = vi.fn()
  const { container } = render(<Blog blog={blog} updateLikes={mockFunc}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const likeBtn = container.querySelector('#like-btn')

  await user.click(likeBtn)
  await user.click(likeBtn)

  expect(mockFunc.mock.calls).toHaveLength(2)
  //   console.log('the click event arr: ', mockFunc.mock.calls)

})

