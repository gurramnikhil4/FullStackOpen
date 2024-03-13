import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
	  token = `Bearer ${newToken}`
	}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
	console.log(response.data)
	return response.data
})
}

const createBlog = async newBlogObject => {
	const config = {
	  headers: { Authorization: token },
	}

	const response = await axios.post(baseUrl, newBlogObject, config)
	console.log(response.data)
	return response.data
  }

export default { getAll,setToken,createBlog }