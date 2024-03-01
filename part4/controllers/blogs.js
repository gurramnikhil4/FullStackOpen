const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User=require('../models/user')

const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
	// Blog
	//   .find({})
	//   .then(blogs => {
	// 	response.json(blogs)
	//   })

	const resp = await Blog.find({}).populate('user',{ username: 1, name: 1 })
	response.json(resp)

  })


blogsRouter.post('/', async (request, response,next) => {
  const blog = new Blog(request.body)

	// const decodedToken =  jwt.verify(request.token, process.env.SECRET)
	// console.log(decodedToken)
	// if (!decodedToken.id) {
	// 	    return response.status(401).json({
	// 			 error: 'token invalid' })
	// 			  }

	const blog_user = await User.findById(request.user.id)
	blog.user=blog_user.id

	const result = await blog.save()
	response.status(201).json(result)

	blog_user.blogs=blog_user.blogs.concat(result.id)
	blog_user.save()
})

blogsRouter.delete('/all', async (request, response,next) => {
	try{
		await Blog.deleteMany({})
		response.status(204).end()
	}catch(exception) {
		next(exception)
		}
})


blogsRouter.delete('/:id', async (request, response,next) => {

	// const decodedToken= jwt.verify(request.token, process.env.SECRET)
	// if (!decodedToken.id) {
	// 	return response.status(401).json({
	// 		 error: 'token invalid' })
	// 		  }

	const blogToDelete = await Blog.findById(request.params.id)
	const blogUser=blogToDelete.user

	// console.log(blogUser.toString())
	// console.log(decodedToken.id)

	if(blogUser.toString()!=request.user.id){
		return response.status(401).json({
				 error: 'user not authorized' })
	}
	
	await Blog.findByIdAndDelete(request.params.id)
	response.status(204).end()
  })


blogsRouter.put('/:id', async (request, response,next) => {

	try{
		const updatedBlog=await Blog.findByIdAndUpdate(request.params.id, request.body, {new:true})
		response.json(updatedBlog)
	}catch(exception) {
		next(exception)
	}
  })

module.exports=blogsRouter
  