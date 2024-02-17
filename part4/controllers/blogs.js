const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/blogs', async (request, response) => {
	// Blog
	//   .find({})
	//   .then(blogs => {
	// 	response.json(blogs)
	//   })

	const resp = await Blog.find({})
	response.json(resp)

  })


blogsRouter.post('/blogs', async (request, response,next) => {
  const blog = new Blog(request.body)

//   blog
//     .save()
//     .then(result => {
//       response.status(201).json(result)
//     })
	try{
		const result = await blog.save()
		response.status(201).json(result)
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
  