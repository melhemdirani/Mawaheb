import axios from 'axios'
const customFetch = axios.create({
  baseURL: 'http://195.110.58.234:4000/api/v1'
})

export default customFetch
