import React, { Component } from 'react';
import { connect } from 'react-redux';
import {logout} from '../../actions/auth.actions';

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    return <div>Sorry to see you go</div>;
  }
}


export default connect(null, {logout})(Logout);