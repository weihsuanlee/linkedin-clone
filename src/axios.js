import axios from 'axios'

// NY Times API https://developer.nytimes.com/docs/top-stories-product/1/overview
const instance = axios.create({
  baseURL: `https://api.nytimes.com/svc/topstories/v2`,
})

export default instance
