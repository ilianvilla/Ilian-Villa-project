import React from 'react';
import "./mailList.scss";

const MailList = () => {
  return (
    <div className='mail'>
      <h1 className="mailTitle">Welcome to Division5's e-mail sector</h1>
      <span className="mailDescription">Sign up for the best deals!</span>
      <div className="mailInputContainer">
        <input type="text" placeholder='Please enter your email:' />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default MailList;
