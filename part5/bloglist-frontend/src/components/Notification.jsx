const Notification = ({ message,type }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={type}>
	  {console.log(type)}
        {message}
      </div>
    )
  }

export default Notification