import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pagSize: 6,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pagSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      
    }
    document.title = `${this.capitalize(this.props.category)} - NewsMonkey`;
  }
  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cb42e593783847928651cf99b0518921&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true, });
    let data = await fetch(url);
    let parsedData = await data.json()
    this.props.setProgress(60)
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cb42e593783847928651cf99b0518921&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

      let data = await fetch(url);
      let parsedData = await data.json()

      this.setState({ articles: this.state.articles.concat(parsedData.articles), page: this.state.page + 1 })

    }
  }
  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }





  render() {

    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{ marginTop: "90px", marginBottom: "90px", height: "25px" }}>NewsMonkey - Top {this.capitalize(this.props.category)} Headlines</h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container" >
            <div className='row'>
              {this.state.articles.map((element) => {
                return <div className="col-md-4 my-3" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 150) : ""} description={element.description} newsUrl={element.url} imageUrl={element.urlToImage ? element.urlToImage : "https://techcrunch.com/wp-content/uploads/2020/06/GettyImages-1211180761.jpg?w=600"} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>

      </div>
    )
  }
}

export default News

