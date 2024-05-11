import React, { Component } from 'react'

export class SearchBar extends Component {


  render() {
    const handleChange = async (e) => {
      let Text = await e.target.value
      let filteredData = this.state.articles.filter((value) => {
        return value.title === Text
      })
      this.setState({ text: Text, filteredData: filteredData })

    }
    return (
      <>
        <div>
          <form className="d-flex" value={this.state.text} onChange={handleChange} role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
         
        </div>

      </>
    )
  }
}

export default SearchBar
