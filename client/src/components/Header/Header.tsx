import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { mapStateToProps } from './HeaderContainer';

type Props = ReturnType<typeof mapStateToProps>;

class Header extends Component<Props> {
  renderLinks() {
    if (this.props.authorized) {
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
      <>
        <div className="header">{this.renderLinks()}</div>
        <div className="header__spacer" />
      </>
    );
  }
}

export default Header;
