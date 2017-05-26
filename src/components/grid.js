import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import Cart from 'material-ui/svg-icons/action/add-shopping-cart';

import {getMonth} from '../helpers';


const GridListExampleSimple = ({posts}) => {
  let currentMonth = '';
  let listItems = [];

  for (const post of posts) {
    const month = getMonth(post.timeStamp * 1e3);
    const year = new Date(post.timeStamp * 1e3).getFullYear();

    if (month !== currentMonth) {
      listItems.push(<Subheader key={month}>{`${currentMonth = month} ${year}`}</Subheader>)
    }

    listItems.push(
      <GridTile
        key={post.id}
        title={post.prodData.Name}
        subtitle={<span>by <b>{post.author}</b></span>}
        actionIcon={<IconButton href={post.prodData.ProductPageUrl} target="_blank"><Cart color="white" /></IconButton>}
      >
        <img src={post.heroImage} alt="" />
      </GridTile>
    )
  }

  return (
    <GridList
      cellHeight={298}>
      {listItems}
    </GridList>
  )
}

export default GridListExampleSimple;
