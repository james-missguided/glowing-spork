import React from 'react';
import AppBar from 'material-ui/AppBar';

export default ({status}) => (
  <AppBar
    title={status}
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
);
