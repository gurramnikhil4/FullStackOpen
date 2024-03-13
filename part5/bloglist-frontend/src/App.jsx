import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage]= useState('')
  const [type, setType]= useState('')
  
  const defaultMessage="Blogs are up to date"

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
	  blogService.setToken(user.token)
      setUser(user)
    }
  }, [])


  const handleLogin = async (event)=>{
	event.preventDefault()

	try{
		const user = await loginService.login({
			username, password
		  })

		window.localStorage.setItem('loggedBlogListUser', JSON.stringify(user)) 

		blogService.setToken(user.token)
		setUser(user)
		setUsername('')
		setPassword('')
		
	}catch (error) {
		setMessage(`wrong username or password`)
		setType(`error`)

		console.log("login-error",error)
		
		setTimeout(() => {
			setMessage('')
			setType(``)
		  }, 5000)
	  }
  }


  const handleLogout = (event)=>{
	window.localStorage.removeItem('loggedBlogListUser')
	setUser(null)
  }

  const handleCreate = async (event)=>{
	event.preventDefault()

	try{
		const newBlogObject={
			title:title,
			author:author,
			url:url
		}

		const addedBlog= await blogService.createBlog(newBlogObject)
		console.log("addedBlog",addedBlog)
		setBlogs(blogs.concat(addedBlog))

		setMessage(`A new blog ${addedBlog.title} added`)
		setType(`success`)

		setTimeout(() => {
			setMessage('defaultMessage')
			setType(`default`)
		  }, 5000)

	}catch(error){
		console.log('failed to add blog')
	  }


  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

		<Notification message={message} type={type}/>


        <form onSubmit={handleLogin}>
			<div>
				<label htmlFor="username">username: </label>
				<input type="text" name="username" id="username" value={username} onChange={({target})=> setUsername(target.value)}/>
			</div>  
			<div>
				<label htmlFor="password">password: </label>
				<input type="password" name="password" id="password" value={password} onChange={({target})=> setPassword(target.value)}/>
			</div>
			<div>
          		<button type="submit">login</button>
       		</div>
		</form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
	  <Notification message={message} type={type}/>

	  <div>{user.name} is logged in 
	  <button onClick={handleLogout}>logout</button>
	  </div>

	  <div>
        <h2>Create New</h2>
        <form onSubmit={handleCreate}>
			<div>
				<label htmlFor="title">title: </label>
				<input type="text" name="title" id="title" value={title} onChange={({target})=> setTitle(target.value)}/>
			</div>  
			<div>
				<label htmlFor="author">author: </label>
				<input type="text" name="author" id="author" value={author} onChange={({target})=> setAuthor(target.value)}/>
			</div>
			<div>
				<label htmlFor="url">url: </label>
				<input type="text" name="url" id="url" value={url} onChange={({target})=> setUrl(target.value)}/>
			</div>  
			<div>
          		<button type="submit">create</button>
       		</div>
		</form>
      </div>


      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App