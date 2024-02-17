const mongoose = require('mongoose')
const app = require('../app.js')
const supertest = require('supertest')
const api= supertest(app)
const helper = require('./test_helper.js')
const Blog = require('../models/blog')

beforeEach( async () => {
	await Blog.deleteMany({})
	console.log(helper.initialBlogs)
	const blogObjects = helper.initialBlogs.map(blog=> new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)

},10000)

test('all blogs are returned', async ()=>{
	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(helper.initialBlogs.length)
},7500)

afterAll(async () => {
	await mongoose.connection.close()
  })
