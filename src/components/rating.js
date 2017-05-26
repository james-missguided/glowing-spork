import React from 'react';
import FullStar from 'material-ui/svg-icons/toggle/star';
import HalfStar from 'material-ui/svg-icons/toggle/star-half';
import EmptyStar from 'material-ui/svg-icons/toggle/star-border';

export default ({rating}) => {
  if (!rating) return null;

  const fullStars = 0 | rating;
  const halfStar = rating !== fullStars;
  const stars = [];
  const ratingStyle = {
    float: 'right',
    marginTop: '5px'
  };

  for (let i = 0; i < 5; i++) {
    if (i <= fullStars - 1) {
      stars.push(<FullStar key={i} />);
    } else if (i === fullStars && halfStar) {
      stars.push(<HalfStar key={i} />);
    } else {
      stars.push(<EmptyStar key={i} />)
    }
  }

  return (
    <div style={ratingStyle}>
      {stars}
    </div>
  );
}
