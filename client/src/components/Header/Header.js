import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <Link to={`/logout`}>Logout</Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to={`/login`}>Login</Link>
          <Link to={`/register`}>Register</Link>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="header">{this.renderLinks()}</div>
    );
  }
}

export default Header;
