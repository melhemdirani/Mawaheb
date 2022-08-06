import axios from 'axios'
const customFetch = axios.create({
  baseURL: 'http://194.5.157.234:4000/api/v1',
})

export default customFetch
