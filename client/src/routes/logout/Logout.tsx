import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from 'redux/modules/auth';
import FormLogin from 'components/FormLogin/FormLogin';
import { Redirect, RouterProps } from 'react-router';

type Props = RouterProps & {
  logout: any;
};

class Logout extends Component<Props> {
  componentDidMount() {
    this.props.logout();
    this.props.history.push('/login');
  }

  render() {
    return null;
  }
}

export default connect(
  null,
  { logout }
)(Logout);
