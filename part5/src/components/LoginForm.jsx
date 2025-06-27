import PropTypes from 'prop-types'
import React, { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [loginCredentials, setLoginCredentials] = useState({
    username: '',
    password: ''
  })
  console.log('cred lookf like: ', loginCredentials)

  const handleSubmit =async(e) => {
    e.preventDefault()
    const resp = await handleLogin(loginCredentials)
    if(resp) setLoginCredentials({ username: '', password: '' })
  }


  const changeHandler = (event) => {
    const { name, value } = event.target
    setLoginCredentials((loginCredentials) => ({
      ...loginCredentials,
      [name]: value,
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
            username
        <input
          type="text"
          data-testid = 'username'
          placeholder='username'
          value={loginCredentials.username}
          name="username"
          onChange={(changeHandler)}
        />
      </div>
      <div>
            password
        <input
          type="password"
          data-testid = 'password'
          placeholder='password'
          value={loginCredentials.password}
          name="password"
          onChange={changeHandler}
        />
      </div>
      <button data-testid = 'login-btn' type="submit">login</button>
    </form>
  )
}
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}
export default LoginForm
