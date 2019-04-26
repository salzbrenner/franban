import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUid, getJwt } from '../redux/modules/auth';
import { AppState } from 'redux/modules/rootReducer';

type Props = {
  location: {
    pathname: string;
  };
  authorized: string | null;
  history: {
    push: Function;
  };
  uid: string | null;
};

export default (ChildComponent: Function) => {
  class AuthComponent extends Component<Props> {
    componentDidMount() {
      this.checkAuthentication();
    }

    componentDidUpdate() {
      this.checkAuthentication();
    }

    checkAuthentication() {
      const path = this.props.location.pathname;

      if (path === '/login' || path === '/register') {
        if (this.props.authorized) {
          this.props.history.push(`/${this.props.uid}`);
        }
      } else {
        if (!this.props.authorized) {
          this.props.history.push('/login');
        }
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps({ auth }: AppState) {
    return {
      authorized: getJwt(auth),
      uid: getUid(auth),
    };
  }

  return connect(mapStateToProps)(AuthComponent);
};
