const mongoose = require('mongoose')
const app = require('../app.js')
const supertest = require('supertest')
const api= supertest(app)
const helper = require('./test_helper.js')
const Blog = require('../models/blog')
const User=require('../models/user.js')
const bcrypt = require('bcrypt')


beforeEach( async () => {
	await Blog.deleteMany({})
	await User.deleteMany({})

	const passwordHash = await bcrypt.hash("qwerty", 10)

	const initialUser=
		{
			username:"lookin",
			name:"nikhil",
			passwordHash:passwordHash
		}
	
	const user= new User(initialUser)
	await user.save()

	const blogObjects = helper.initialBlogs.map(note => new Blog(note))
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
})

test('add a blog', async()=>{
	const newBlog={
		title: "abc123123",
		author: "xyz098098",
		url: "abcxyz.com",
		likes: 10,
	}

	const userInfo={
		username:"lookin",
		password:"qwerty"
	}

	const token = await api
	.post('/api/login')
	.send(userInfo)
	.then(resp=>{
		return resp.body.token
	})

	const tokenInHeader='Bearer'+' '+token

	await api
	.post('/api/blogs')
	.send(newBlog)
	.set('Authorization', tokenInHeader)
	.expect(201)
	.expect('Content-Type', /application\/json/)

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

describe('adding users', () => {
	beforeEach(async () => {
		await User.deleteMany({})
		const userObjects = helper.initialUsers.map(user=> new User(user))
		const promiseArrayUser = userObjects.map(user => user.save())
		await Promise.all(promiseArrayUser)	
	},10000)

	test('with unique and valid username and valid password passes', async () => {
		const newUser={
			name:"john",
			username:"johnny",
			password:"qwerty"
		}
	
		await api
		.post('/api/users')
		.send(newUser)
		.expect(201)
		.expect('Content-Type', /application\/json/)

		const usersInDBTest = await helper.usersInDB()
		expect(usersInDBTest.length).toEqual(helper.initialUsers.length+1)
	},10000)

	test('with invalid password fails', async () => {
		const newUser={
			name:"john",
			username:"johnny",
			password:"qw"
		}
	
		await api
		.post('/api/users')
		.send(newUser)
		.expect(400)

	},10000)

	test('with invalid username fails', async () => {
		const newUser={
			name:"john",
			username:"jo",
			password:"qwerty"
		}
	
		await api
		.post('/api/users')
		.send(newUser)
		.expect(400)
	},20000)

	test('with duplicate username fails', async () => {
		const newUser={
			name:"jo",
			username:"lookin",
			password:"qwerty"
		}
	
		await api
		.post('/api/users')
		.send(newUser)
		.expect(400)
	},20000)
  })



afterAll(async () => {
	await mongoose.connection.close()
  })
