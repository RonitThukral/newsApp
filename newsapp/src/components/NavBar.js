import React, { Component } from 'react'
import {Link} from 'react-router-dom'


export default class NavBar extends Component {
  constructor (){
    super()
  this.state = {
    text: "",
    articles: [],
    filteredData: []
  }
}
  fetchedData = async () => {
  let url = `https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=cb42e593783847928651cf99b0518921`;

  let data = await fetch(url);
  let parsedData = await data.json()
  this.setState({ articles: parsedData.articles })
 console.log("Success")
}
 componentDidMount(){
  this.fetchedData()
 }
  
  handleChange = (e)=>{
  let searchWord = e.target.value
  let filter = this.state.articles.filter((value)=>{
    return value.title.toLowerCase().includes(searchWord)
  })
  if(searchWord === ""){
    this.setState({filteredData:[]})
  }else {
  this.setState({filteredData:filter})
  }
      }
    

  render() {
   
  
    return (
      <>
      <div>
     <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">NewsMonkey</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/business">Business</Link></li>
        <li className="nav-item">
          <Link className="nav-link" to="/entertainment">Entertainment</Link></li>
        {/* <li className="nav-item">
          <Link className="nav-link" to="/">General</Link></li> */}
        <li className="nav-item">
          <Link className="nav-link" to="/health">Health</Link></li>
        <li className="nav-item">
          <Link className="nav-link" to="/science">Science</Link></li>
        <li className="nav-item">
          <Link className="nav-link" to="/sports">Sports</Link></li>
        <li className="nav-item">
          <Link className="nav-link" to="/technology">Technology</Link></li>
       
      </ul>
      <form className="d-flex" onChange={this.handleChange} value= {this.state.text} role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
    </div>
  </div>
</nav>


<div  className="list-group float-end overflow-auto" style={{marginRight: "72px",marginTop:"-34px",height:"140px", width:"230px"}}>
  
    {this.state.filteredData.length !==0 && this.state.filteredData.slice(0,10).map((element)=>{
    return <a key={element.url} target = "_blanck" href={element.url} className="list-group-item list-group-item-action">{element.title}</a>
  })}
  
  
 
  {/* <a href="" className="list-group-item list-group-item-action">A third link item</a>
  <a href="" className="list-group-item list-group-item-action">A fourth link item</a>
  <a href="" className="list-group-item list-group-item-action">A third link item</a>
  <a href="" className="list-group-item list-group-item-action">A fourth link item</a> */}
</div>
</div>
    </>
    )
  }
}
