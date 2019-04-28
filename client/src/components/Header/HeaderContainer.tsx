import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { getJwt } from 'redux/modules/auth';
import { AppState } from 'redux/modules/rootReducer';

export const mapStateToProps = ({ auth }: AppState) => {
  return {
    authorized: getJwt(auth),
  };
};

export default connect(mapStateToProps)(Header);
