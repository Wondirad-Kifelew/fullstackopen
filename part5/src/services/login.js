import axios from 'axios'

const baseURL = '/api/login'


const login = async (credentials) => {
  console.log('login credentials in service', credentials)
  const response = await axios.post(baseURL, credentials)
  console.log('response looks like', response)
  return response.data
}

export default { login }