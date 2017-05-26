import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import Card from './components/card.js';
import Grid from './components/grid.js';
import queryString from 'query-string';

import getSoicalFeed from './services/get_social_feed';
import {searchObj, sensibleImg} from './helpers';

import './App.css';

import Notification  from './components/Notification.js';

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

  handlePermissionGranted(){
    console.log('Permission Granted');
    this.setState({
      ignore: false
    });
  }
  handlePermissionDenied(){
    console.log('Permission Denied');
    this.setState({
      ignore: true
    });
  }
  handleNotSupported(){
    console.log('Web Notification not Supported');
    this.setState({
      ignore: true
    });
  }

  handleNotificationOnClick(e, tag){
    console.log(e, 'Notification clicked tag:' + tag);
  }

  handleNotificationOnError(e, tag){
    console.log(e, 'Notification error tag:' + tag);
  }

  handleNotificationOnClose(e, tag){
    console.log(e, 'Notification closed tag:' + tag);
  }

  handleNotificationOnShow(e, tag){
    this.playSound();
    console.log(e, 'Notification shown tag:' + tag);
  }

  playSound(filename){
    document.getElementById('sound').play();
  }

  handleButtonClick() {

    if(this.state.ignore) {
      return;
    }

    const now = Date.now();

    const title = 'Notification ' + now;
    const body = 'Hello there :) \r\n' + new Date();
    const tag = now;
    const icon = 'http://georgeosddev.github.io/react-web-notification/example/Notifications_button_24.png';
    const options = {
      tag: tag,
      body: body,
      icon: icon,
      lang: 'en',
      dir: 'ltr',
      sound: './sound.mp3'  // no browsers supported https://developer.mozilla.org/en/docs/Web/API/notification/sound#Browser_compatibility
    }
    this.setState({
      title: title,
      options: options
    });
  }

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

	        <button onClick={this.handleButtonClick.bind(this)}>Notify me!</button>
	        <Notification
	          ignore={this.state.ignore && this.state.title !== ''}
	          notSupported={this.handleNotSupported.bind(this)}
	          onPermissionGranted={this.handlePermissionGranted.bind(this)}
	          onPermissionDenied={this.handlePermissionDenied.bind(this)}
	          onShow={this.handleNotificationOnShow.bind(this)}
	          onClick={this.handleNotificationOnClick.bind(this)}
	          onClose={this.handleNotificationOnClose.bind(this)}
	          onError={this.handleNotificationOnError.bind(this)}
	          timeout={3000}
	          title={this.state.title}
	          options={this.state.options}
	        />
	        <audio id='sound' preload='auto'>
	          <source src='./sound.mp3' type='audio/mpeg' />
	          <source src='./sound.ogg' type='audio/ogg' />
	          <embed hidden='true' autostart='false' loop='false' src='./sound.mp3' />
	        </audio>

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
