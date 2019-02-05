import { connect } from 'react-redux';
import Header from './Header';
import {getJwt} from 'redux/modules/auth';

const mapStateToProps = state => {
  return {
    authenticated: getJwt(state)
  }
};

export default connect(mapStateToProps)(Header)
