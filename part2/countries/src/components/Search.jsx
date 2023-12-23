const Search=(props)=>{
  return(
    <div>
        <label htmlFor='search'>find countries</label>
        <input value={props.value} type='text' id='search' onChange={props.onChange}/>
    </div>
  )
}


export default Search