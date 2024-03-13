import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
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

		setUser(user)
		setUsername('')
		setPassword('')
	}catch (error) {
		console.log('wrong credentials')
	  }
  }


  const handleLogout = (event)=>{
	window.localStorage.removeItem('loggedBlogListUser')
	setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
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
	  <div>{user.name} is logged in 
	  <button onClick={handleLogout}>logout</button>
	  </div>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App