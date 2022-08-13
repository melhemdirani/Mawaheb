import axios from 'axios'
const customFetch = axios.create({
  baseURL: 'http://194.5.157.234:4000/api/v1',
  baseURL: 'http://192.168.16.103:4000/api/v1', //mirza ip
})

export default customFetch
