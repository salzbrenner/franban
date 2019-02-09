import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUid, getJwt } from '../redux/modules/auth';

export default ChildComponent => {
  class AuthComponent extends Component {
    componentDidMount() {
      this.checkAuthentication();
    }

    componentDidUpdate() {
      this.checkAuthentication();
    }

    checkAuthentication() {
      const path = this.props.location.pathname;

      if (path === '/login' || path === '/register') {
        if (this.props.authenticated) {
          this.props.history.push(`/${this.props.uid}`);
        }
      } else {
        if (!this.props.authenticated) {
          this.props.history.push('/login');
        }
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      authenticated: getJwt(state),
      uid: getUid(state),
    };
  }

  return connect(mapStateToProps)(AuthComponent);
};
