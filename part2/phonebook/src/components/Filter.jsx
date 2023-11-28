const Filter = (props)=>{
return (
    <>
    <label htmlFor="search">filter shown with </label>
    <input value={props.newSearch} type="text" id="search" name="toSearch" onChange={props.onChange}/>
    </>
)
}


export default Filter