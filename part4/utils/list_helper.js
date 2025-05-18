const dummy = (blogs)=>{
  return blogs.length >=0? 1:0
}

const totalLikes = (blogs)=>{
  let likesCount = 0
  blogs.forEach(blog => likesCount +=blog.likes)
  return likesCount
}

const favouriteBlog = (blogs)=>{
  let maxLike = 0
  let favBlog = {}

  blogs.forEach(blog=>{
    if(blog.likes >= maxLike){
      maxLike = blog.likes
      favBlog = blog
    }
  })
  return favBlog
}

const mostBlogs = (blogs)=>{
  if (blogs.length === 0) 
    return {}
  const x = blogs.map(blog=>{
    return {
      author: blog.author,
      numOfBlogs: 1
    }
  })
  // console.log('console result: ', x)
  let authorCounts = []
  for (let i = 0; i < x.length; i++) {
    // x = [ { author: 'b', numOfBlogs: 1 }, { author: 'a', numOfBlogs: 1 }, { author: 'a', numOfBlogs: 1 } ]

    const existing = authorCounts.find(obj=>obj.author === x[i].author)
    if (existing){
      existing.numOfBlogs +=1
    }else{
      authorCounts.push({ author: x[i].author, numOfBlogs: 1 })
    }
  } 
  
  let maxBlogCount = 0
  let maxBlog = {}

  authorCounts.forEach(blog=>{
    if(blog.numOfBlogs >= maxBlogCount){
      maxBlogCount = blog.numOfBlogs
      maxBlog = blog
    }
  })
  return maxBlog
                       
}
const mostLikes= (blogs)=>{
  if (blogs.length === 0){
    return {}
  }
  let maxLikes = 0
  let maxLikeObj = {}

  blogs.forEach(blog=>{
    if(blog.likes >= maxLikes){
      maxLikes = blog.likes
      maxLikeObj = blog
    }
  })
  return {
    author: maxLikeObj.author,
    likes: maxLikeObj.likes
  }
}
module.exports = {dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes}
