const usersRouter= require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')



usersRouter.post('/users', async(req,res)=>{
	const{username, password, name}= req.body
	if(password.length<3){
		return res.status(400).json({ error: 'invalid password' })
	}
	const saltRounds = 10
	const hashedPassword = await bcrypt.hash(password, saltRounds)

	const user = new User(
		{
			username,
			hashedPassword,
			name			
		}
	)

	const savedUser= await user.save()

	res.status(201).json(savedUser)

})

usersRouter.get('/users', async(req,res)=>{
	const users = await User.find({}).populate('blogs')
	res.json(users)
  })


module.exports = usersRouter