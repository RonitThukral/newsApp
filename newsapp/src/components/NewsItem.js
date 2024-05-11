import React, { Component } from 'react'

export class NewsItem extends Component {
state={
isOpen:false,
btnTxt: "More"
}
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source} = this.props;
    const toggledesc = async () => {
  
      this.setState({ isOpen: !this.state.isOpen})

    }
    return (
      <div>

        <div className="card"   >
          <img src={imageUrl} className="card-img-top" style={{ height: '200px' }} alt="..." />
          <div className="card-body" >
            <span className="badge rounded-pill text-bg-info my-2">{source}</span>
            <h5 className="card-title">{title}</h5>
            <p className="card-text" >{description?this.state.isOpen?description:description.slice(0,50):"No description kindly click on Read More to read the full news"}... 

              {description && <button id={newsUrl} type="button" onClick= {toggledesc} className=" btn btn-sm fw-normal btn-light mx-3 my-1">{this.state.isOpen?"Less":this.state.btnTxt}</button>}</p>
            
            <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} On {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blanck" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
