import React from 'react';
import AppBar from 'material-ui/AppBar';

export default ({status}) => (
  <div className="header">
    <span>{status}</span>
  </div>
);
