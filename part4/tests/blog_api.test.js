const mongoose = require('mongoose')
const app = require('../app.js')
const supertest = require('supertest')
const api= supertest(app)
const helper = require('./test_helper.js')
const Blog = require('../models/blog')

beforeEach( async () => {
	await Blog.deleteMany({})
	// console.log(helper.initialBlogs)
	const blogObjects = helper.initialBlogs.map(blog=> new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)

},30000)

test('all blogs are returned', async ()=>{
	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(helper.initialBlogs.length)
},7500)

test('blog should have id, not _id', async()=>{
	const response = await api.get('/api/blogs')
	console.log(response.body[0])
	expect(response.body[0].id).toBeDefined()
	// expect(response.body[0]._id).toBeDefined()
})

test('add a blog', async()=>{
	const newBlog={
		title: "abc123123",
		author: "xyz098098",
		url: "abcxyz.com",
		likes: 10,
	}

	await api
	.post('/api/blogs')
	.send(newBlog)
	.expect(201)
	.expect('Content-Type', /application\/json/)

	//You are testing the app api, not mongoose api
	// const newBlogDoc= new Blog(newBlog)
	// await newBlogDoc.save()

	const blogsInDBTest = await helper.blogsInDB()
	expect(blogsInDBTest).toHaveLength(helper.initialBlogs.length + 1)

})

test('likes should default to zero', async()=>{
	const newBlog={
		title: "abc123123",
		author: "xyz098098",
		url: "abcxyz.com"}

	await api
	.post('/api/blogs')
	.send(newBlog)
	.expect(201)
	.expect('Content-Type', /application\/json/)

	const blogsInDBTest = await helper.blogsInDB()
	// console.log(blogsInDBTest)
	expect(blogsInDBTest[helper.initialBlogs.length].likes).toEqual(0)

})

test('blogs should have a title and url', async()=>{
	const newBlog={
		author: "xyz098098"
	}

	await api
	.post('/api/blogs')
	.send(newBlog)
	.expect(400)

	// const blogsInDBTest = await helper.blogsInDB()
	// // console.log(blogsInDBTest)
	// expect(blogsInDBTest[helper.initialBlogs.length].likes).toEqual(0)

}, 30000)

test('deleting a blog', async()=>{
	const blogsBeforeDelete = await helper.blogsInDB()
	const blogToDelete = blogsBeforeDelete[0]

	await api
	.delete (`/api/blogs/${blogToDelete.id}`)
	.expect(204)

	const blogsAfterDelete = await helper.blogsInDB()

	expect(blogsAfterDelete).toHaveLength(
		helper.initialBlogs.length - 1
	  )
  
	const contents = blogsAfterDelete.map(r => r.title)
  
	expect(contents).not.toContain(blogToDelete.title)
})


test('updating a blog', async()=>{
	const blogsBeforeUpdate = await helper.blogsInDB()
	const blogToUpdate = blogsBeforeUpdate[0]

	const blogEdit= {...blogToUpdate, likes:5}

	await api
	.put(`/api/blogs/${blogToUpdate.id}`)
	.send(blogEdit)
	.expect(200)

	const blogsAfterUpdate = await helper.blogsInDB()
	const blogAfterUpdate = blogsAfterUpdate[0]

	expect(blogAfterUpdate.likes).toEqual(5)

},10000)


afterAll(async () => {
	await mongoose.connection.close()
  })
