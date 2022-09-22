import axios from 'axios'
const customFetch = axios.create({
  baseURL: 'http://195.110.58.234:4000/api/v1'
})
//192.168.1.102
// 172.20.10.13

export default customFetch
