const dummy = (blogs) => {
 	return 1  
}

const totalLikes =(blogs)=>{

	return blogs.reduce((sum,curr)=>{
		return sum+curr.likes
	},0)
}
  
  module.exports = {
	dummy, totalLikes
  }