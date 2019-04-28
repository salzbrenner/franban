import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from 'redux/modules/auth';

type Props = {
  logout: typeof logout;
};

class Logout extends Component<Props> {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    return <div>Sorry to see you go</div>;
  }
}

export default connect(
  null,
  { logout }
)(Logout);
