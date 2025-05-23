# Full Stack Open - Part 4  
## Blog List API 


#### 📌 Introduction  
This project is a RESTful API for managing blog posts and users. It provides endpoints for creating, retrieving, updating, and deleting blog posts while also handling user authentication and login with JSON Web Token (JWT). The backend is built with **Node.js** and **Express.js**, using MongoDB as the database and Mongoose for object modeling.

This project is part of the **University of Helsinki's Full Stack Open course (Part 4 Exercises).**  

---
## 🧰 Technologies Used

- **Node.js** + **Express.js** – Backend framework
- **MongoDB** + **Mongoose** – NoSQL database & ODM
- **JWT (jsonwebtoken)** – Authentication
- **bcrypt** – Password hashing
- **Supertest** – HTTP assertions for integration testing
- **node:test** – Unit & integration testing framework
- **ESLint** – Code linting and formatting
- **dotenv** – Environment variable management

---
## 🚀 Features  
- CRUD operations for blog posts
- User authentication with JWT
- User registration and login
- Password hashing with bcrypt
- Token-based authentication
- Mongoose data validation
- Middleware for logging, error handling, and authentication
- Unit and integration testing using Node.js's built-in [`node:test`](https://nodejs.org/api/test.html) module and [Supertest](https://github.com/ladjs/supertest) to ensure functionality and prevent regressions.  
---

## 📺 Validation and Data Integrity  
This API includes **Mongoose validation** to ensure data integrity:  
- Blog title and URL are required.  
- Users must have a unique username.  
- Passwords are hashed before being stored.

---

## 📺 Code Quality with ESLint  
This project follows code quality standards enforced by **ESLint** to maintain clean and consistent code.  

Check for linting issues:  
```sh
npm run lint
```  
Fix linting errors automatically:  
```sh
npm run lint:fix
```  

---

## 📺 Testing  
The project includes **unit and integration tests** using Node.js's built-in [`node:test`] and Supertest to ensure functionality and prevent regressions.  

- **Unit tests** are written to check individual functions, such as utility methods.
- **Integration tests** ensure that different parts of the API work together correctly, such as testing endpoints.

### Running Tests
Run all tests:
```sh
npm test
```

Run tests in watch mode:
```sh
npm test -- --watch
```

Generate test coverage report:
```sh
npm test -- --coverage
```

Example test case for the **blog API**:
```javascript
test('a valid blog can be added', async () => {
  const blogsAtStart = await helper.blogsInDb();

  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testblog.com',
    likes: 5
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtStart.length + 1, blogAtEnd.length)
});
```

---

## 🧪 API Testing with REST Client

In addition to automated testing, this project also uses the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) VS Code extension for manual API testing. REST Client allows you to write HTTP requests directly in `.http` or `.rest` files and execute them inside your editor.

### Example Request File (`./requests/requests.rest`):

```http
### Get all blogs
GET http://localhost:3003/api/blogs
Authorization: Bearer {{token}}

### Add a new blog
POST http://localhost:3003/api/blogs
Content-Type: application/json
Authorization: Bearer {{token}}

{
  "title": "new title",
  "author": "alemu",
  "url": "http://example.com",
  "likes": 10
}

### Login and get token
POST http://localhost:3003/api/login
Content-Type: application/json

{
  "username": "root",
  "password": "sekret"
}

```
---

## 🛠️ Setup & Installation  

### 1️⃣ Clone the repository  
```sh
git clone https://github.com/Wondirad-Kifelew/fullstackopen.git
cd ./fullstackopen/part4
```

### 2️⃣ Install dependencies  
```sh
npm install
```  

### 3️⃣ Configure MongoDB (Database Setup)  

Create a `.env` file in the root directory and add your database credentials:
```sh
MONGO_URI=mongodb+srv://your-username:your-password@cluster0.mongodb.net/blogApp?retryWrites=true&w=majority
SECRET_KEY=your_secret_key
```  

Make sure `.env` is added to `.gitignore` to keep credentials safe.  

### 4️⃣ Start the server  
Run in development mode with:  
```sh
npm run dev
```  
Run in production mode:  
```sh
npm start
```  

---

## 📚 API Endpoints  

| Method | Endpoint         | Description                 |
|--------|-----------------|-----------------------------|
| GET    | `/api/blogs`     | Get all blogs              |
| GET    | `/api/blogs/:id` | Get a single blog by ID    |
| POST   | `/api/blogs`     | Add a new blog post        |
| PUT    | `/api/blogs/:id` | Update a blog post        |
| DELETE | `/api/blogs/:id` | Delete a blog post        |
| POST   | `/api/users`     | Register a new user        |
| POST   | `/api/login`     | Authenticate user & get token |

---

## 📂 Project Structure  

```
part4/
├───controllers/          # Request handlers  
│   ├── blogs.js          # Blog-related controllers  
│   ├── users.js          # User-related controllers  
│   ├── login.js          # Authentication  
├───models/  
│   ├── blog.js           # Blog schema  
│   ├── user.js           # User schema  
├───requests/  
│   ├── requests.rest     # Manually tests HTTP reqests
├───tests/                # Unit & Integration tests along with a helper module
│   ├── blog_api.test.js  
│   ├── test_helper.js    
│   ├── user_api.test.js  
├───utils/  
│   ├── config.js         # Configuration settings  
│   ├── logger.js         # Logging utility  
│   ├── middleware.js     # Middleware functions  
│── .env                  # Environment variables (not pushed to GitHub)  
│── app.js                # Sets up the Express app with middleware, routes, and configuration (exported for testing)
│── eslint.config.mjs     # Es lint config file for defining linting rules 
│── index.js              # Main application file  
│── package-lock.json     # Dependency lock file  
│── package.json          # Project dependencies  
```

---

💡 **Contributions and feedback are welcome! Feel free to submit a pull request. 🚀**