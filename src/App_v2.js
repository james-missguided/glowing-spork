import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {posts: []}
  }


  componentWillMount() {
    getSoicalFeed()
      .then(res => {
        const prods = res.productData;

        const posts = res.updates.map(({data}) => {
          return {
            author: data.author.username,
            avatar: data.author.avatar,
            timeStamp: data.timestamp,
            heroImage: data.photos[0].image_service_url,
            text: data.text,
            prodData: searchObj(prods, data.tags),
            id: data.id
          }
        })

        this.setState({posts})
      });
  }
}
