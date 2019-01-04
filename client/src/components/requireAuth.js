import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userIsAuthenticated} from 'redux/modules/auth';

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
        if (this.props.auth) {
          this.props.history.push('/');
        }
      }
      else {
        if (!this.props.auth) {
          this.props.history.push('/login');
        }
      }
    }

    render() {
      return <ChildComponent {...this.props}/>;
    }
  }

  function mapStateToProps(state) {
    return {auth: userIsAuthenticated(state)};
  }

  return connect(mapStateToProps)(AuthComponent);
}