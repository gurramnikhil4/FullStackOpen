const dummy = (blogs) => {
 	return 1  
}

const totalLikes =(blogs)=>{

	return blogs.reduce((sum,curr)=>{
		return sum+curr.likes
	},0)
}

const favoriteBlog =(blogs)=>{

if(blogs.length==0)return {}

 let fBlog={
	'likes':0
 }

 for(let i=0;i<blogs.length;i++){
	if(blogs[i].likes>=fBlog.likes){
		fBlog.title=blogs[i].title
		fBlog.author=blogs[i].author
		fBlog.likes=blogs[i].likes
	}
 }
 return fBlog
}
  
  module.exports = {
	dummy, totalLikes, favoriteBlog
  }