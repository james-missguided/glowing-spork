import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import {daysPast} from '../helpers'
import Rating from './rating';

function subTitleTxt(timeStamp) {
  const numOfDays = daysPast(timeStamp * 1e3);
  const dayOrDays = numOfDays > 1 ? 'days' : 'day';

  return `posted ${numOfDays} ${dayOrDays} ago`;
}

export default ({author, avatar, timeStamp, heroImage, text, prodData}) => (
  <Card>
    <CardHeader
      title={author}
      subtitle={subTitleTxt(timeStamp)}
      avatar={avatar}
    />
    <CardMedia
      overlay={<CardTitle title={prodData.Name} />}
    >
      <img src={heroImage} alt="" />
    </CardMedia>
    <CardText
      style={{'overflowWrap': 'break-word'}}
    >
      {prodData.Description}
    </CardText>
    <CardActions>
      <RaisedButton
        href={prodData.ProductPageUrl}
        target="_blank"
        label="Shop Now" />

      <Rating rating={prodData.ReviewStatistics.AverageOverallRating} />
    </CardActions>


  </Card>
);
