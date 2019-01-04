import React, { Component } from 'react';
import { connect } from 'react-redux';
import {logout} from 'redux/modules/auth';

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    return <div>Sorry to see you go</div>;
  }
}


export default connect(null, {logout})(Logout);