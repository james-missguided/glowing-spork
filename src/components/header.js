import React from 'react';
import logo from '../MGLogo.jpg';
const spanstyle = {
  'margin-right': '7px',
  'margin-top': '-3px',
  'display': 'flex'}

export default ({status}) => (
<div className="header">
    <img className="logo" src={logo} onClick={() => window.location.reload() }/>
  <div className="heartwrapper">  
    <span style={spanstyle}>{status}</span>
    <div className={status === 'online' ? 'onblack' : 'ongrey'} />
  </div>
</div>
);
