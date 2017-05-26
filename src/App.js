import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import Card from './components/card.js';
import Grid from './components/grid.js';
import queryString from 'query-string';

import getSoicalFeed from './services/get_social_feed';
import {searchObj, sensibleImg} from './helpers';

import './App.css';

function last(arr) {
  return arr[arr.length - 1];
}

function parseResponse(res) {
  const prods = res.productData;

  return res.updates.map(({data}) => {
    return {
      author: data.author.username,
      avatar: data.author.avatar,
      timeStamp: data.timestamp,
      heroImage: sensibleImg(data.photos[0].image_service_url),
      text: data.text,
      prodData: searchObj(prods, data.tags),
      id: data.id
    }
  }).filter(({prodData}) => !!prodData)
}

export default class extends Component {

  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      version: queryString.parse(window.location.hash).version
    }

    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  componentWillMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        version: queryString.parse(window.location.hash).version
      })
    })

    getSoicalFeed({limit: 6})
      .then(parseResponse)
      .then(posts => {
        this.setState({posts})
      });
  }

  handleLoadMore() {
    const lastTimestamp = last(this.state.posts).timeStamp;

    getSoicalFeed({limit: 6, before: lastTimestamp})
      .then(parseResponse)
      .then(newPosts => {
        this.setState(prevState => ({
          posts: [...prevState.posts, ...newPosts]
        }))
      });
  }


  render() {
    const opt1 = () => {
      const cards = this.state.posts.map(post => {
        return (
          <li key={post.id}>
            <Card {...post}  />
          </li>
        )
      })

      return (
        <div className="wrapper">
          <ul className="card-list">
            {cards}
          </ul>
          <RaisedButton
            label="Load More"
            fullWidth={false}
            onClick={this.handleLoadMore}
            style={{maxWidth: '800px', width: '100%'}}
          />
        </div>
      )
    }

    const opt2 = () => {
      return (
        <div className="wrapper">
          <div className="grid-cont">
            <Grid posts={this.state.posts} />
          </div>
          <RaisedButton
            label="Load More"
            fullWidth={false}
            onClick={this.handleLoadMore}
            style={{maxWidth: '610px', width: '100%'}}
          />
        </div>
      )
    }

    const version = this.state.version;

    return (version === 'opt1') ? opt1() :
           (version === 'opt2') ? opt2() :
           opt1();
  }
}
