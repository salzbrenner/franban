import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { AuthState, getJwt } from 'redux/modules/auth';
import { AppState } from 'redux/modules/rootReducer';

const mapStateToProps = ({ auth }: AppState): any => {
  return {
    authorized: getJwt(auth),
  };
};

export default connect(mapStateToProps)(Header);
