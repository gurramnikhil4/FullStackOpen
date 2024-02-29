const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User=require('../models/user')

blogsRouter.get('/blogs', async (request, response) => {
	// Blog
	//   .find({})
	//   .then(blogs => {
	// 	response.json(blogs)
	//   })

	const resp = await Blog.find({}).populate('user')
	response.json(resp)

  })


blogsRouter.post('/blogs', async (request, response,next) => {
  const blog = new Blog(request.body)

//   blog
//     .save()
//     .then(result => {
//       response.status(201).json(result)
//     })
	const blog_user = await User.findOne()
	blog.user=blog_user.id

	const result = await blog.save()
	response.status(201).json(result)

	blog_user.blogs=blog_user.blogs.concat(result.id)
	blog_user.save()
})

blogsRouter.delete('/blogs/all', async (request, response,next) => {
	try{
		await Blog.deleteMany({})
		response.status(204).end()
	}catch(exception) {
		next(exception)
		}
})

blogsRouter.delete('/blogs/:id', async (request, response,next) => {
	try{
		await Blog.findByIdAndDelete(request.params.id)
		response.status(204).end()
	}catch(exception) {
		next(exception)
		}
  })



blogsRouter.put('/blogs/:id', async (request, response,next) => {

	try{
		const updatedBlog=await Blog.findByIdAndUpdate(request.params.id, request.body, {new:true})
		response.json(updatedBlog)
	}catch(exception) {
		next(exception)
	}
  })

module.exports=blogsRouter
  