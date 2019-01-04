import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
          <div>
            <Link to={`/logout`}>Logout</Link>
          </div>
      )
    } else {
      return (
          <div>
            <Link to={`/login`}>Login</Link>
            <Link to={`/register`}>Register</Link>
          </div>
      )
    }
  }
  render() {
    return (
        <div className="header">
          <h1>header</h1>
          {this.renderLinks()}
        </div>
    )
  }
}

export default Header;