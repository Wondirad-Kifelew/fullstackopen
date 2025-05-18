const {test, describe} = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

describe('dummy tests', ()=>{
  test('dummy returns 1', ()=>{
    const blogs = []
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)      
  })
  test('dummy returns 1', ()=>{
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)      
  })
})

describe('total likes', ()=>{
  test('of empty list is zero', ()=>{
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 0)
  })
  test('when list has only one blog equals the likes of that', ()=>{
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 5)
  })
  test('of a bigger list is calculated right', ()=>{
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }, 
      {
        _id: '5a422ba71b54a676234d17f8',
        title: 'some new thing',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 8,
        __v: 0
      }
    ]
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 13)
  })
})
describe('favourite blog', ()=>{
  test('of empty list is empty', ()=>{
    const blogs = []
    const result = listHelper.favouriteBlog(blogs)
    assert.deepEqual(result, {})
  })
  test('when list has only one blog equals that blog', ()=>{
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]
    const result = listHelper.favouriteBlog(blogs)
    assert.deepEqual(result, {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    })
  })
  test('of a bigger list is the blog with maximum likes', ()=>{
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 15,
        __v: 0
      }, 
      {
        _id: '5a422ba71b54a676234d17f8',
        title: 'some new thing',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 8,
        __v: 0
      }
    ]
    const result = listHelper.favouriteBlog(blogs)
    assert.deepEqual(result, {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 15,
      __v: 0
    })
  })
    
})

describe('most blogs', ()=>{
  test('of empty list is empty', ()=>{
    const blogs = []  
    const result = listHelper.mostBlogs(blogs)
    assert.deepEqual(result, {})
  })
  test('when list has only one blog equals 1 blog', ()=>{
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]
    const result = listHelper.mostBlogs(blogs)
    assert.deepEqual(result, { author: 'Edsger W. Dijkstra', numOfBlogs: 1 })
  })
  test('of a bigger list is count of the num of blogs of that author', ()=>{
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }, 
      {
        _id: '5a422ba71b54a676234d17f8',
        title: 'some new thing',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 8,
        __v: 0
      },
      {
        _id: '5a422ba71b54a676234d17f8',
        title: 'some new thing',
        author: 'w',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 8,
        __v: 0
      }
    ]  
    const result = listHelper.mostBlogs(blogs)
    assert.deepEqual(result, 
      {
        author: 'Edsger W. Dijkstra',
        numOfBlogs: 2
      }
    )
  })

})
                    
describe('most likes', ()=>{
  test('of empty list is empty', ()=>{
    const blogs = []  
    const result = listHelper.mostLikes(blogs)
    assert.deepEqual(result, {})
  })
  test('when list has only one blog equals likes of that blog', ()=>{
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]
    const result = listHelper.mostLikes(blogs)
    assert.deepEqual(result, { author: 'Edsger W. Dijkstra', likes: 5 })
  })
  test('of a bigger list is count of the likes most liked blog', ()=>{
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }, 
      {
        _id: '5a422ba71b54a676234d17f8',
        title: 'some new thing',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 8,
        __v: 0
      },
      {
        _id: '5a422ba71b54a676234d17f8',
        title: 'some new thing',
        author: 'w',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 13,
        __v: 0
      }
    ]  
    const result = listHelper.mostLikes(blogs)
    assert.deepEqual(result, 
      {
        author: 'w',
        likes: 13
      }
    )
  })
      
})    
        

