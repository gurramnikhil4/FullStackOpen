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


module.exports=blogsRouter
  