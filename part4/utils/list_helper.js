const blog = require("../models/blog")
const _ = require('lodash')

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
  

const mostLikes =(blogs)=>{
	let map={}
	for(entry in blogs){

		if(map[blogs[entry].author])
		map[blogs[entry].author]+=blogs[entry].likes
		
		else
		map[blogs[entry].author]=blogs[entry].likes

	}
	console.log(map)

	let mostLiked={ 
		"author": null,
		"likes":0
	}
	
	_.forEach(map, (value,key)=>{
		if(mostLiked.likes<value){
			mostLiked.author=key
			mostLiked.likes=value
		}
	})

	return mostLiked
}

  module.exports = {
	dummy, 
	totalLikes,
	favoriteBlog,
	mostLikes
  }