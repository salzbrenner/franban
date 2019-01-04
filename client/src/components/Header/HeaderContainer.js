import { connect } from 'react-redux';
import Header from './Header';
import {userIsAuthenticated} from '../../reducers/auth.reducer';

const mapStateToProps = state => {
  return {
    authenticated: userIsAuthenticated(state)
  }
};

export default connect(mapStateToProps)(Header)
