const { test, expect, beforeEach, describe } = require('@playwright/test')

const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // empty the db and create a user
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users/', {
        data:{
        name: 'wondirad',
        username: 'wonde',
        password: 'password'
        }
    })
    await request.post('http://localhost:3003/api/users/', {
        data:{
        name: 'another-wondirad',
        username: 'wonde-2',
        password: 'password'
        }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const usernameField = await page.getByPlaceholder('username')
    const passwordField = await page.getByPlaceholder('password')
    const loginBtn = await page.getByRole('button', {name: 'login'})
    
    await expect(usernameField).toBeVisible()
    await expect(passwordField).toBeVisible()
    await expect(loginBtn).toBeVisible()
  })

  describe('Logging in', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'wonde', 'password')
      await expect(page.getByTestId('login-msg')).toHaveText('logged in as wonde')

    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'wonde', 'wrongpass')

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('Error: Wrong credentials')
    })
    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
          await loginWith(page, 'wonde', 'password')
        })

        test('a new blog can be created', async ({ page }) => {
          await createBlog(page, 'new-title', 'new-author', 'new-url')
          await createBlog(page, 'new-title-2', 'new-author', 'new-url')
          await createBlog(page, 'new-title-3', 'new-author', 'new-url')

          await expect(page.getByText('new-title-3 new-author')).toBeVisible()          
        })

        describe('when a note is there initially', () => {
          beforeEach(async ({ page }) => {
          await createBlog(page, 'new-title', 'new-author', 'new-url')
          await createBlog(page, 'new-title-2', 'new-author', 'new-url')
          await createBlog(page, 'new-title-3', 'new-author', 'new-url')
        }) 
           
            test('a blog can be liked', async({page})=>{
            const firstBlogElement = await page.getByText('new-title new-author')
            
            await firstBlogElement.getByRole('button', {name: 'view'}).click()
            
            // bef clicking like
            const likeBefElement = await page.getByTestId('likes')
            const likeCountBef = parseInt( await likeBefElement.textContent())

            await expect(page.getByTestId('likes')).toHaveText(/^\d+$/)


            // after clicking like
            await page.getByRole('button', {name: 'like'}).click()
            await expect(page.getByTestId('likes')).toContainText(String(likeCountBef +1))
          
                     
            })
             test('blogs are sorted in descending number of likes', async({page})=>{
              const blogLocators = await page.getByTestId('blog-title-author')
              const blogArray = await blogLocators.all()
              let likeArray = [];

              //just for adding fake likes and i wanted each to have diff amounts
              for(let i=0; i < blogArray.length;i++){
                await blogArray[i].getByRole('button', {name: 'view'}).click()
                for(let j=0; j <= i; j++){
                  const prevLikes = parseInt(await page.getByTestId('likes').textContent())
                  await page.getByRole('button', {name: 'like'}).click()

                  await expect(page.getByTestId('likes')).toHaveText(String(prevLikes+1)) 
                }
          
                await page.getByRole('button', {name: 'hide'}).click()
              }
              
              // getting the likes out of each blog adn store them in likeArr
              for(let i=0; i < blogArray.length;i++){
                await blogArray[i].getByRole('button', {name: 'view'}).click()
                const likeText = await page.getByTestId('likes').textContent()
                likeArray.push(parseInt(likeText))
                await page.getByRole('button', {name: 'hide'}).click()
              }
              // check if they're sorted
              const sortedDecOrder = likeArray.every((_, i) => i===0 || likeArray[i-1] >= likeArray[i])
              await expect(sortedDecOrder).toBeTruthy()
             })
            describe('When logged in as another user', () => {
              beforeEach(async ({page}) => {
              // logout and login as another user
              await page.getByRole('button', {name: 'logout'}).click()
      
              await loginWith(page, 'wonde-2', 'password')

              })
              test('check if is the other user is logged in', async({page})=> {
                await expect(page.getByText('logged in as wonde-2')).toBeVisible()
              })
              test('fails to remove a blog if they\'re not the owner', async({page})=>{
                const firstBlogElement = await page.getByText('new-title new-author')
            
                await firstBlogElement.getByRole('button', {name: 'view'}).click()
                
                page.once('dialog', async (dialog) => {
                expect(dialog.type()).toBe('confirm')
                await dialog.accept()
              })
                
                await page.getByRole('button', {name: 'remove'}).click()
                //deleted element to still be visible
                await expect(page.getByText('new-title new-author')).toBeVisible()
              }) 
              test('succeeds to delete a blog if they are the owner of the blog', async({page})=>{
                // logout from wonde-2 and login as wonde to delete the blog
                await page.getByRole('button', {name: 'logout'})
                await expect(page.getByText('login')).toBeVisible()

                //login as wonde(the blogowner)
                await loginWith(page, 'wonde', 'password')
                
                const firstBlogElement = await page.getByText('new-title new-author')
                await firstBlogElement.getByRole('button', {name: 'view'}).click()

                  page.once('dialog', async (dialog) => {
                  expect(dialog.type()).toBe('confirm')
                  // can also confirm the dialog message to be...
                  await dialog.accept()
                })

                await page.getByRole('button', {name: 'remove'}).click()
                  
                await expect(page.getByTestId('new-title new-author')).not.toBeVisible()
                                
              })
           })
        })
     })
  })
})